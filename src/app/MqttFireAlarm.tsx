"use client";

import { useMqttSensorData } from "./MqttSensorProvider";

export default function MqttFireAlarm() {
  const { fireDetected, fireBoards } = useMqttSensorData();

  if (!fireDetected) return null;

  return (
    <>
      <div className="fire-alarm-flash" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[10000] flex justify-center px-4">
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-3 rounded-lg border-2 border-white bg-[#a92727] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_32px_rgba(115,15,15,0.4)] sm:text-base"
        >
          <span className="text-xl" aria-hidden="true">!</span>
          <span>ALARM · FLAMME ERKANNT{fireBoards.length ? ` · ${fireBoards.join(", ")}` : ""}</span>
        </div>
      </div>
    </>
  );
}