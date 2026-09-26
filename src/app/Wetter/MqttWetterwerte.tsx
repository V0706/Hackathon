"use client";

import { useMqttSensorData, type SensorMetric } from "../MqttSensorProvider";

const metrics = [
  { key: "temperature", label: "Temperatur", unit: "°C" },
  { key: "humidity", label: "Luftfeuchtigkeit", unit: "%" },
  { key: "soilMoisture", label: "Bodenfeuchtigkeit", unit: "%" },
  { key: "light", label: "Licht", unit: "lx" },
  { key: "fire", label: "Feuer", unit: "" },
];

export default function MqttWetterwerte() {
  const { averages, sampleCounts, fireDetected, fireBoards, boardCount, status } = useMqttSensorData();

  return (
    <section className="w-full max-w-5xl text-left" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-4 text-[#1f465d]">
        <h2 className="text-xl font-semibold">Live-MQTT-Daten</h2>
        <span className="rounded-full border border-[#bfd8ea] bg-[#ebf5fb] px-3 py-1 text-sm font-medium text-[#3f6a87]">
          {status}
        </span>
      </div>

      <p className="mb-4 text-sm text-[#5d7482]">Durchschnittswerte aus {boardCount} empfangenen Boards.</p>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const value = metric.key === "fire"
            ? fireDetected === undefined
              ? "Warte auf Daten..."
              : fireDetected
                ? `Flamme erkannt${fireBoards.length ? ` (${fireBoards.join(", ")})` : ""}`
                : "Keine Flamme"
            : averages[metric.key as Exclude<SensorMetric, "fire">] === undefined
              ? "Warte auf Daten..."
              : `${averages[metric.key as Exclude<SensorMetric, "fire">]?.toFixed(1)} ${metric.unit}`;
          const count = metric.key === "fire"
            ? undefined
            : sampleCounts[metric.key as Exclude<SensorMetric, "fire">];

          return (
            <div
              key={metric.key}
              className="min-h-[150px] rounded-xl border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#dfeef8] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]"
            >
              <dt className="text-sm font-medium text-[#567a93]">{metric.label}</dt>
              <dd className="mt-4 text-3xl font-semibold text-[#1f465d]">
                {value}
              </dd>
              {count !== undefined && <p className="mt-3 text-xs text-[#567a93]">Mittelwert aus {count} Boards</p>}
            </div>
          );
        })}
      </dl>
    </section>
  );
}