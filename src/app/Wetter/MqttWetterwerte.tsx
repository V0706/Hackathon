"use client";

import { useEffect, useState } from "react";

type MqttReading = {
  topic: string;
  payload: string;
  receivedAt: string;
};

type MqttStatus = {
  connected: boolean;
  error?: string;
};

const metrics = [
  { topic: "garten/status/temperatur", label: "Temperatur", unit: "°C" },
  { topic: "garten/status/feuchtigkeit", label: "Luftfeuchtigkeit", unit: "%" },
  { topic: "garten/status/licht", label: "Helligkeit", unit: "" },
];

export default function MqttWetterwerte() {
  const [readings, setReadings] = useState<MqttReading[]>([]);
  const [status, setStatus] = useState("Verbinde mit Sensor...");

  useEffect(() => {
    const events = new EventSource("/api/mqtt");

    events.addEventListener("status", (event) => {
      const nextStatus = JSON.parse((event as MessageEvent<string>).data) as MqttStatus;
      setStatus(
        nextStatus.connected
          ? "Verbunden"
          : nextStatus.error
            ? `Verbindungsfehler: ${nextStatus.error}`
            : "Verbindung getrennt",
      );
    });

    events.addEventListener("reading", (event) => {
      const reading = JSON.parse((event as MessageEvent<string>).data) as MqttReading;
      setReadings((current) => [
        reading,
        ...current.filter((item) => item.topic !== reading.topic),
      ]);
    });

    events.onerror = () => setStatus("Verbindung wird wiederhergestellt...");
    return () => events.close();
  }, []);

  return (
    <section className="w-full max-w-5xl text-left" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-4 text-[#1f465d]">
        <h2 className="text-xl font-semibold">Live-MQTT-Daten</h2>
        <span className="rounded-full border border-[#bfd8ea] bg-[#ebf5fb] px-3 py-1 text-sm font-medium text-[#3f6a87]">
          {status}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {metrics.map((metric) => {
          const reading = readings.find((item) => item.topic === metric.topic);

          return (
            <div
              key={metric.topic}
              className="min-h-[150px] rounded-xl border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#dfeef8] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]"
            >
              <dt className="text-sm font-medium text-[#567a93]">{metric.label}</dt>
              <dd className="mt-4 text-3xl font-semibold text-[#1f465d]">
                {reading ? `${reading.payload}${metric.unit ? ` ${metric.unit}` : ""}` : "Warte auf Daten..."}
              </dd>
              <p className="mt-3 text-xs text-[#567a93]">{metric.topic}</p>
            </div>
          );
        })}
      </dl>
    </section>
  );
}