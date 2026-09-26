"use client";

import { useMqttSensorData } from "./MqttSensorProvider";

const metrics = [
  { key: "temperature", label: "Temperatur", unit: "°C" },
  { key: "humidity", label: "Luftfeuchte", unit: "%" },
  { key: "light", label: "Licht", unit: "lx" },
] as const;

export default function MqttStartseitenwerte() {
  const { averages, sampleCounts, status } = useMqttSensorData();

  return (
    <>
      <dl className="mt-7 grid grid-cols-1 divide-y divide-[#e7ece6] border-t border-[#e7ece6] pt-1">
        {metrics.map((metric) => (
          <div key={metric.key} className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-xs leading-5 text-[#748078]">{metric.label}</dt>
            <dd className="mt-1 text-lg font-semibold text-[#284b38]">
              {averages[metric.key] === undefined
                ? "Warte auf Daten..."
                : `${averages[metric.key]?.toFixed(1)} ${metric.unit}`}
            </dd>
            {sampleCounts[metric.key] > 0 && (
              <span className="text-[10px] text-[#89948e]">Ø {sampleCounts[metric.key]} Boards</span>
            )}
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-5 text-xs text-[#8a958e]">{status}</p>
    </>
  );
}