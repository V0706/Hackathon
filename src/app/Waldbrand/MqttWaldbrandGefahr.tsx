"use client";

import { useMemo } from "react";
import { useMqttSensorData } from "../MqttSensorProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function computeRisk(values: {
  temperature: number | undefined;
  humidity: number | undefined;
  soilMoisture: number | undefined;
  flame: boolean | undefined;
}) {
  const { temperature, humidity, soilMoisture, flame } = values;

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

export default function MqttWaldbrandGefahr({ detailed = false }: { detailed?: boolean }) {
  const { averages, fireDetected, status } = useMqttSensorData();
  const risk = useMemo(
    () => computeRisk({
      temperature: averages.temperature,
      humidity: averages.humidity,
      soilMoisture: averages.soilMoisture,
      flame: fireDetected,
    }),
    [averages, fireDetected],
  );

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

      {detailed && (
        <dl aria-label="Durchschnittliche Eingangswerte der Waldbrandberechnung" className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#eee7dc] pt-5 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-[#81776b]">Temperatur</dt>
            <dd className="mt-1 font-semibold text-[#403326]">{risk.temperature === undefined ? "--" : `${risk.temperature.toFixed(1)} °C`}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#81776b]">Luftfeuchtigkeit</dt>
            <dd className="mt-1 font-semibold text-[#403326]">{risk.humidity === undefined ? "--" : `${risk.humidity.toFixed(1)} %`}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#81776b]">Bodenfeuchtigkeit</dt>
            <dd className="mt-1 font-semibold text-[#403326]">{risk.soilMoisture === undefined ? "--" : `${risk.soilMoisture.toFixed(1)} %`}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#81776b]">Feuer</dt>
            <dd className={`mt-1 font-semibold ${risk.flame ? "text-[#a33b32]" : "text-[#403326]"}`}>
              {risk.flame === undefined ? "--" : risk.flame ? "Flamme erkannt" : "Keine Flamme"}
            </dd>
          </div>
        </dl>
      )}

      <p className="mt-auto pt-5 text-xs text-[#9a8e80]">
        {risk.ready ? `${risk.label} · live berechnet` : "Warte auf Messdaten"}
      </p>
    </section>
  );
}
