"use client";

import { useMqttSensorData, type SensorMetric } from "./MqttSensorProvider";

const metrics: { key: SensorMetric; label: string; unit: string }[] = [
  { key: "temperature", label: "Temperatur", unit: "°C" },
  { key: "humidity", label: "Luftfeuchtigkeit", unit: "%" },
  { key: "soilMoisture", label: "Bodenfeuchtigkeit", unit: "%" },
  { key: "light", label: "Licht", unit: "lx" },
  { key: "fire", label: "Feuer", unit: "" },
];

export default function MqttLiveSensorwerte() {
  const { averages, sampleCounts, fireDetected, fireBoards, boardCount, status } = useMqttSensorData();

  return (
    <section aria-label="Durchschnittswerte der drei Garten-Boards" aria-live="polite" className="border-b border-[#d8e2d8] bg-white/90 px-4 py-3">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#56715b]">Garten · Live-Mittelwerte</p>
          <p className="text-[10px] text-[#7a877e]">{status} · {boardCount}/3 Boards empfangen</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => {
            const value = metric.key === "fire"
              ? fireDetected === undefined
                ? "Warte auf Daten"
                : fireDetected
                  ? `Flamme${fireBoards.length ? ` · ${fireBoards.join(", ")}` : " erkannt"}`
                  : "Keine Flamme"
              : averages[metric.key] === undefined
                ? "Warte auf Daten"
                : `${averages[metric.key]?.toFixed(1)} ${metric.unit}`;
            const sourceCount = metric.key === "fire" ? undefined : sampleCounts[metric.key];

            return (
              <div key={metric.key} className="min-w-0 border-l-2 border-[#dce7dc] pl-2">
                <dt className="text-[10px] text-[#758178]">{metric.label}</dt>
                <dd className={`truncate text-xs font-semibold ${metric.key === "fire" && fireDetected ? "text-[#a33b32]" : "text-[#284b38]"}`}>
                  {value}
                </dd>
                {sourceCount !== undefined && sourceCount > 0 && (
                  <dd className="text-[9px] text-[#89948e]">Ø aus {sourceCount} Boards</dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}