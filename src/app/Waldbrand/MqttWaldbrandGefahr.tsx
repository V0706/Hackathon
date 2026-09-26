"use client";

import { useEffect, useMemo, useState } from "react";

type MqttStatus = {
  connected: boolean;
  error?: string;
};

type ReadingMap = Record<string, string>;

const metricAliases = {
  temperature: ["garten/status/temperatur", "garten/status/temp", "temperatur"],
  humidity: ["garten/status/feuchtigkeit", "garten/status/luftfeuchtigkeit", "luftfeuchtigkeit"],
  soil: ["garten/status/bodenfeuchte", "garten/status/bodenfeuchtigkeit", "bodenfeuchte", "bodenfeuchtigkeit"],
  flame: ["garten/status/flamme", "garten/status/flammen", "garten/status/fire", "flammensensor", "flame"],
} as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function resolveValue(values: ReadingMap, aliases: readonly string[]) {
  for (const alias of aliases) {
    const value = values[alias];
    if (value !== undefined) return value;
  }
  return undefined;
}

function parseNumber(value: string | undefined) {
  if (value === undefined) return undefined;

  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseFlame(value: string | undefined) {
  if (value === undefined) return undefined;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "on", "yes", "detected", "fire", "flamme", "flammend"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "off", "no", "normal", "none", "leer"].includes(normalized)) {
    return false;
  }
  return undefined;
}

function computeRisk(values: ReadingMap) {
  const temperature = parseNumber(resolveValue(values, metricAliases.temperature));
  const humidity = parseNumber(resolveValue(values, metricAliases.humidity));
  const soilMoisture = parseNumber(resolveValue(values, metricAliases.soil));
  const flame = parseFlame(resolveValue(values, metricAliases.flame));

  if (temperature === undefined && humidity === undefined && soilMoisture === undefined && flame === undefined) {
    return {
      level: 0,
      label: "Warte auf Daten",
      score: 0,
      ready: false,
      temperature,
      humidity,
      soilMoisture,
      flame,
    };
  }

  let score = 0;
  let weights = 0;

  if (temperature !== undefined) {
    const tempRisk = clamp((temperature - 18) / 18, 0, 1);
    score += tempRisk * 0.35;
    weights += 0.35;
  }

  if (humidity !== undefined) {
    const humidityRisk = clamp((40 - humidity) / 40, 0, 1);
    score += humidityRisk * 0.25;
    weights += 0.25;
  }

  if (soilMoisture !== undefined) {
    const soilRisk = clamp((35 - soilMoisture) / 35, 0, 1);
    score += soilRisk * 0.25;
    weights += 0.25;
  }

  if (flame !== undefined) {
    score += (flame ? 1 : 0) * 0.15;
    weights += 0.15;
  }

  const normalizedScore = weights > 0 ? clamp(score / weights, 0, 1) : 0;
  const finalScore = clamp(flame ? 1 : normalizedScore, 0, 1);

  let level = 1;
  if (flame) {
    level = 5;
  } else if (finalScore >= 0.85) {
    level = 5;
  } else if (finalScore >= 0.7) {
    level = 4;
  } else if (finalScore >= 0.5) {
    level = 3;
  } else if (finalScore >= 0.3) {
    level = 2;
  }

  const labels = ["Sehr niedrig", "Niedrig", "Mäßig", "Erhöht", "Hoch", "Sehr hoch"];
  const label = labels[level];

  return {
    level,
    label,
    score: finalScore,
    ready: true,
    temperature,
    humidity,
    soilMoisture,
    flame,
  };
}

export default function MqttWaldbrandGefahr() {
  const [values, setValues] = useState<ReadingMap>({});
  const [status, setStatus] = useState("Verbinde mit Sensor...");

  useEffect(() => {
    const events = new EventSource("/api/mqtt");

    events.addEventListener("status", (event) => {
      const nextStatus = JSON.parse((event as MessageEvent<string>).data) as MqttStatus;
      setStatus(
        nextStatus.connected
          ? "Sensor verbunden"
          : nextStatus.error
            ? `Verbindungsfehler: ${nextStatus.error}`
            : "Sensor nicht verbunden",
      );
    });

    events.addEventListener("reading", (event) => {
      const reading = JSON.parse((event as MessageEvent<string>).data) as {
        topic: string;
        payload: string;
      };

      setValues((current) => ({
        ...current,
        [reading.topic]: reading.payload,
      }));
    });

    events.onerror = () => setStatus("Verbindung wird wiederhergestellt...");
    return () => events.close();
  }, []);

  const risk = useMemo(() => computeRisk(values), [values]);

  const dangerLevels = [1, 2, 3, 4, 5];

  return (
    <section className="w-full max-w-5xl rounded-2xl border border-[#ead8d4] bg-[#fffdfc] p-6 shadow-[0_12px_32px_rgba(93,45,40,0.09)]">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a4945]">Waldbrandgefahr</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#422e2d]">Live-Berechnung</h2>
        </div>
        <span className="rounded-full border border-[#ecc9c3] bg-[#f9efee] px-3 py-1 text-sm font-medium text-[#8a4945]">
          {status}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#ead8d4] bg-[#fff7f5] p-4">
          <p className="text-sm text-[#7a5f5d]">Temperatur</p>
          <p className="mt-3 text-2xl font-semibold text-[#422e2d]">
            {risk.temperature !== undefined ? `${risk.temperature.toFixed(1)} °C` : "--"}
          </p>
        </div>

        <div className="rounded-xl border border-[#ead8d4] bg-[#fff7f5] p-4">
          <p className="text-sm text-[#7a5f5d]">Luftfeuchtigkeit</p>
          <p className="mt-3 text-2xl font-semibold text-[#422e2d]">
            {risk.humidity !== undefined ? `${risk.humidity.toFixed(1)} %` : "--"}
          </p>
        </div>

        <div className="rounded-xl border border-[#ead8d4] bg-[#fff7f5] p-4">
          <p className="text-sm text-[#7a5f5d]">Bodenfeuchte</p>
          <p className="mt-3 text-2xl font-semibold text-[#422e2d]">
            {risk.soilMoisture !== undefined ? `${risk.soilMoisture.toFixed(1)} %` : "--"}
          </p>
        </div>

        <div className="rounded-xl border border-[#ead8d4] bg-[#fff7f5] p-4">
          <p className="text-sm text-[#7a5f5d]">Flammensensor</p>
          <p className="mt-3 text-2xl font-semibold text-[#422e2d]">
            {risk.flame === undefined ? "--" : risk.flame ? "Ja" : "Nein"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#ead8d4] bg-[#fff7f5] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[#7a5f5d]">Gefahrenstufe</p>
            <p className="mt-1 text-4xl font-bold text-[#6e302e]">
              {risk.ready ? `${risk.level} / 5` : "--"}
            </p>
          </div>
          <p className="text-lg font-semibold text-[#6e302e]">
            {risk.ready ? risk.label : "Warten auf Messdaten"}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          {dangerLevels.map((level) => (
            <div
              key={level}
              className={`h-3 flex-1 rounded-full ${
                risk.ready && risk.level >= level
                  ? level === 1
                    ? "bg-[#8ab38d]"
                    : level === 2
                      ? "bg-[#d7b166]"
                      : level === 3
                        ? "bg-[#ea9a52]"
                        : level === 4
                          ? "bg-[#d86d4a]"
                          : "bg-[#a73939]"
                  : "bg-[#f0e7e3]"
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-sm leading-6 text-[#7a5f5d]">
          Berechnung: 35 % Temperatur, 25 % Luftfeuchtigkeit, 25 % Bodenfeuchte, 15 % Flammensensor.
          <br />
          Niedrige Bodenfeuchte, hohe Temperatur, trockene Luft und ein aktivierter Flammensensor erhöhen die Gefahr.
        </p>
      </div>
    </section>
  );
}
