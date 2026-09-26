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
    <section className="w-full max-w-2xl text-left" aria-live="polite">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Live-MQTT-Daten</h2>
        <p className="text-sm text-zinc-300">{status}</p>
      </div>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => {
          const reading = readings.find((item) => item.topic === metric.topic);

          return (
            <div key={metric.topic} className="rounded-lg bg-zinc-800 p-4">
              <dt className="text-sm text-zinc-300">{metric.label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">
                {reading ? `${reading.payload}${metric.unit ? ` ${metric.unit}` : ""}` : "Warte auf Daten..."}
              </dd>
              <p className="mt-2 text-xs text-zinc-400">{metric.topic}</p>
            </div>
          );
        })}
      </dl>
      {readings.some((reading) => !metrics.some((metric) => metric.topic === reading.topic)) && (
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">Weitere Statusmeldungen</h3>
        <ul className="space-y-3">
          {readings.filter((reading) => !metrics.some((metric) => metric.topic === reading.topic)).map((reading) => (
            <li key={reading.topic} className="rounded-lg bg-zinc-800 p-4">
              <p className="mb-2 text-sm font-semibold text-zinc-200">
                {reading.topic}
              </p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm text-white">
                {reading.payload}
              </pre>
              <p className="mt-2 text-xs text-zinc-400">
                Empfang: {new Date(reading.receivedAt).toLocaleTimeString()}
              </p>
            </li>
          ))}
        </ul>
        </div>
      )}
    </section>
  );
}