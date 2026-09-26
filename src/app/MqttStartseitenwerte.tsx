"use client";

import { useEffect, useState } from "react";

const metrics = [
  { topic: "garten/status/temperatur", label: "Temperatur", unit: "°C" },
  { topic: "garten/status/feuchtigkeit", label: "Luftfeuchte", unit: "%" },
  { topic: "garten/status/licht", label: "Helligkeit", unit: "" },
];

type MqttStatus = {
  connected: boolean;
  error?: string;
};

export default function MqttStartseitenwerte() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Verbinde mit Sensor...");

  useEffect(() => {
    const events = new EventSource("/api/mqtt");

    events.addEventListener("status", (event) => {
      const nextStatus = JSON.parse((event as MessageEvent<string>).data) as MqttStatus;
      setStatus(
        nextStatus.connected
          ? "Sensor verbunden"
          : nextStatus.error
            ? "MQTT-Verbindung fehlgeschlagen"
            : "Sensor nicht verbunden",
      );
    });

    events.addEventListener("reading", (event) => {
      const reading = JSON.parse((event as MessageEvent<string>).data) as {
        topic: string;
        payload: string;
      };
      setValues((current) => ({ ...current, [reading.topic]: reading.payload }));
    });

    events.onerror = () => setStatus("Verbindung wird wiederhergestellt...");
    return () => events.close();
  }, []);

  return (
    <>
      <dl className="mt-7 grid grid-cols-1 divide-y divide-[#e7ece6] border-t border-[#e7ece6] pt-1">
        {metrics.map((metric) => (
          <div key={metric.topic} className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-xs leading-5 text-[#748078]">{metric.label}</dt>
            <dd className="mt-1 text-lg font-semibold text-[#284b38]">
              {values[metric.topic]
                ? `${values[metric.topic]}${metric.unit ? ` ${metric.unit}` : ""}`
                : "Warte auf Daten..."}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-5 text-xs text-[#8a958e]">{status}</p>
    </>
  );
}