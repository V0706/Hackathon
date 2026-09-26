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
    <section className="w-full text-left">
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="mb-2 text-xs font-bold uppercase text-[#98734c]">Risikoeinschätzung</p>
        <span className="rounded-full border border-[#ecc9c3] bg-[#f9efee] px-2 py-0.5 text-[10px] font-medium text-[#8a4945]">
          {status}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-[#403326]">Waldbrandgefahr</h2>
      <p className="mt-2 text-sm text-[#776d61]">Aktuelles Gefahrenlevel</p>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#eee7dc] pt-5">
        <div>
          <p className="text-xs text-[#81776b]">Gefahrenstufe</p>
          <p className="mt-1 text-3xl font-semibold text-[#8d5b2d]">
            {risk.ready ? (
              <>
                {risk.level} <span className="text-base font-medium text-[#887867]">/ 5</span>
              </>
            ) : (
              <span className="text-base font-medium text-[#887867]">--</span>
            )}
          </p>
        </div>
        <span className="rounded-md border border-[#ead5b7] bg-[#fbf0df] px-3 py-1.5 text-sm font-semibold text-[#8d5b2d]">
          {risk.ready ? risk.label : "Warte..."}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5" aria-label="Gefahrenstufe">
        {dangerLevels.map((level) => (
          <span
            key={level}
            className={`h-1.5 rounded-full ${
              risk.ready && risk.level >= level
                ? level === 1
                  ? "bg-[#6d9a70]"
                  : level === 2
                    ? "bg-[#c58b4c]"
                    : level === 3
                      ? "bg-[#d98f4d]"
                      : level === 4
                        ? "bg-[#d86d4a]"
                        : "bg-[#a73939]"
                : "bg-[#e7e3dc]"
            }`}
          />
        ))}
      </div>

      <p className="mt-auto pt-5 text-xs text-[#9a8e80]">
        {risk.ready ? `${risk.label} · live berechnet` : "Warte auf Messdaten"}
      </p>
    </section>
  );
}
