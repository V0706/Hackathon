"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SensorMetric = "temperature" | "humidity" | "soilMoisture" | "light" | "fire";
type NumericMetric = Exclude<SensorMetric, "fire">;
type BoardValues = Partial<Record<SensorMetric, number | boolean>>;
type BoardMap = Record<string, BoardValues>;

type SensorContextValue = {
  averages: Record<NumericMetric, number | undefined>;
  sampleCounts: Record<NumericMetric, number>;
  fireDetected: boolean | undefined;
  fireBoards: string[];
  boardCount: number;
  status: string;
};

const metricAliases: Record<SensorMetric, string[]> = {
  temperature: ["temperatur", "temperature", "temp"],
  humidity: ["luftfeuchtigkeit", "luftfeuchte", "humidity", "feuchtigkeit"],
  soilMoisture: ["bodenfeuchtigkeit", "bodenfeuchte", "soilmoisture", "soilhumidity"],
  light: ["licht", "helligkeit", "light", "brightness", "lux"],
  fire: ["feuer", "flamme", "flammensensor", "fire", "flame", "firesensor"],
};

const numericMetrics: NumericMetric[] = ["temperature", "humidity", "soilMoisture", "light"];
const emptyContext: SensorContextValue = {
  averages: { temperature: undefined, humidity: undefined, soilMoisture: undefined, light: undefined },
  sampleCounts: { temperature: 0, humidity: 0, soilMoisture: 0, light: 0 },
  fireDetected: undefined,
  fireBoards: [],
  boardCount: 0,
  status: "Verbinde mit Sensor...",
};

const SensorContext = createContext<SensorContextValue>(emptyContext);

function normalizePart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function metricForName(name: string): SensorMetric | undefined {
  const normalized = normalizePart(name);
  return (Object.keys(metricAliases) as SensorMetric[]).find((metric) =>
    metricAliases[metric].includes(normalized),
  );
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseFire(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value !== "string") return undefined;

  const normalized = normalizePart(value);
  if (["1", "true", "on", "yes", "detected", "fire", "feuer", "flamme", "flammend"].includes(normalized)) return true;
  if (["0", "false", "off", "no", "normal", "none", "leer", "keinfeuer", "keineflamme"].includes(normalized)) return false;
  return undefined;
}

function parseMetricValue(metric: SensorMetric, value: unknown) {
  return metric === "fire" ? parseFire(value) : parseNumber(value);
}

function getBoardName(topicParts: string[]) {
  const rootIndex = topicParts.findIndex((part) => normalizePart(part) === "garten");
  if (rootIndex < 0) return "Sensor";

  const path = topicParts.slice(rootIndex + 1);
  if (normalizePart(path[0] ?? "") !== "status") return path[0] ?? "Sensor";

  const metricIndex = path.findIndex((part) => metricForName(part) !== undefined);
  const boardName = metricIndex < 0
    ? undefined
    : path.slice(metricIndex + 1).find((part) => metricForName(part) === undefined);
  return boardName ?? "Sensor";
}

function mergeReading(current: BoardMap, topic: string, payload: string): BoardMap {
  const parts = topic.split("/").filter(Boolean);
  const board = getBoardName(parts);
  const next: BoardMap = { ...current, [board]: { ...current[board] } };
  const topicMetric = parts.map(metricForName).find((metric) => metric !== undefined);
  let parsedPayload: unknown;

  try {
    parsedPayload = JSON.parse(payload) as unknown;
  } catch {}

  if (parsedPayload && typeof parsedPayload === "object" && !Array.isArray(parsedPayload)) {
    for (const [key, value] of Object.entries(parsedPayload)) {
      let metric = metricForName(key);
      if (topicMetric === "soilMoisture" && normalizePart(key) === "humidity") metric = "soilMoisture";
      if (!metric) continue;
      const parsed = parseMetricValue(metric, value);
      if (parsed !== undefined) next[board][metric] = parsed;
    }
    return next;
  }

  if (topicMetric) {
    const value = parsedPayload ?? payload;
    const parsed = parseMetricValue(topicMetric, value);
    if (parsed !== undefined) next[board][topicMetric] = parsed;
    return next;
  }

  return next;
}

function toContextValue(boards: BoardMap, status: string): SensorContextValue {
  const averages = { temperature: undefined, humidity: undefined, soilMoisture: undefined, light: undefined } as SensorContextValue["averages"];
  const sampleCounts = { temperature: 0, humidity: 0, soilMoisture: 0, light: 0 };

  for (const metric of numericMetrics) {
    const values = Object.values(boards)
      .map((board) => board[metric])
      .filter((value): value is number => typeof value === "number");
    sampleCounts[metric] = values.length;
    averages[metric] = values.length ? values.reduce((total, value) => total + value, 0) / values.length : undefined;
  }

  const knownFireValues = Object.values(boards)
    .map((board) => board.fire)
    .filter((value): value is boolean => typeof value === "boolean");
  const fireBoards = Object.entries(boards)
    .filter(([, board]) => board.fire === true)
    .map(([board]) => board === "Sensor" ? "Unbekanntes Board" : board);

  return {
    averages,
    sampleCounts,
    fireDetected: knownFireValues.length ? knownFireValues.some(Boolean) : undefined,
    fireBoards,
    boardCount: Object.keys(boards).filter((board) => board !== "Sensor").length,
    status,
  };
}

export function MqttSensorProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<BoardMap>({});
  const [status, setStatus] = useState(emptyContext.status);

  useEffect(() => {
    const events = new EventSource("/api/mqtt");
    events.addEventListener("status", (event) => {
      const connection = JSON.parse((event as MessageEvent<string>).data) as { connected: boolean; error?: string };
      setStatus(connection.connected ? "Sensoren verbunden" : connection.error ? "MQTT-Verbindung fehlgeschlagen" : "Sensoren nicht verbunden");
    });
    events.addEventListener("reading", (event) => {
      const reading = JSON.parse((event as MessageEvent<string>).data) as { topic: string; payload: string };
      setBoards((current) => mergeReading(current, reading.topic, reading.payload));
    });
    events.onerror = () => setStatus("Verbindung wird wiederhergestellt...");
    return () => events.close();
  }, []);

  const value = useMemo(() => toContextValue(boards, status), [boards, status]);
  return <SensorContext.Provider value={value}>{children}</SensorContext.Provider>;
}

export function useMqttSensorData() {
  return useContext(SensorContext);
}