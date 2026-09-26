"use client";

import { useState } from "react";

const steps = [
  {
    name: "Boden",
    role: "Nährstoffspeicher",
    icon: "🪱",
    color: "#8d6e63",
    description: "Der Waldboden speichert Wasser und Mineralstoffe. In ihm leben zahlreiche Kleinstlebewesen, die abgestorbenes Material zersetzen.",
    connection: "Die frei werdenden Nährstoffe versorgen die Pflanzen und halten den Kreislauf in Gang.",
  },
  {
    name: "Pflanze",
    role: "Produzent",
    icon: "🌿",
    color: "#75a95b",
    description: "Pflanzen nutzen Sonnenlicht, Wasser und Kohlendioxid, um energiereiche Biomasse aufzubauen.",
    connection: "Sie bilden die Nahrungsgrundlage für Pflanzenfresser wie Blattläuse.",
  },
  {
    name: "Blattlaus",
    role: "Pflanzenfresser",
    icon: "🐛",
    color: "#d3a735",
    description: "Blattläuse saugen Pflanzensaft und nehmen so einen Teil der in der Pflanze gespeicherten Energie auf.",
    connection: "Sie sind Nahrung für Marienkäfer und geben die Pflanzenenergie an Räuber weiter.",
  },
  {
    name: "Marienkäfer",
    role: "Insektenräuber",
    icon: "🐞",
    color: "#d96a47",
    description: "Der Marienkäfer jagt Blattläuse und begrenzt dadurch deren Bestand.",
    connection: "Als Räuber gibt er die aufgenommene Energie an größere Tiere wie Vögel weiter.",
  },
  {
    name: "Vogel",
    role: "Räuber",
    icon: "🐦",
    color: "#5793ad",
    description: "Viele Waldvögel fressen Insekten und weitere kleine Tiere. Sie stehen damit weiter oben in der Nahrungskette.",
    connection: "Ausscheidungen und Überreste gelangen zurück in den Boden und werden dort zersetzt.",
  },
  {
    name: "Pilze",
    role: "Destruenten",
    icon: "🍄",
    color: "#7f8c5d",
    description: "Pilze zersetzen abgestorbene Pflanzen und Tiere gemeinsam mit Bakterien und anderen Bodenlebewesen.",
    connection: "Dabei werden Nährstoffe freigesetzt, die in den Boden zurückkehren und neues Pflanzenwachstum ermöglichen.",
  },
];

const arrows = [
  { color: "#75a95b", d: "M 220 82 A 138 138 0 0 1 340 151" },
  { color: "#d3a735", d: "M 340 151 A 138 138 0 0 1 340 289" },
  { color: "#d96a47", d: "M 340 289 A 138 138 0 0 1 220 358" },
  { color: "#5793ad", d: "M 220 358 A 138 138 0 0 1 100 289" },
  { color: "#7f8c5d", d: "M 100 289 A 138 138 0 0 1 100 151" },
  { color: "#8d6e63", d: "M 100 151 A 138 138 0 0 1 220 82" },
];

export default function FoodChainCycle() {
  const [activeIndex, setActiveIndex] = useState(3);
  const activeStep = steps[activeIndex];
  const rotation = -activeIndex * 60;

  const nextStep = () => setActiveIndex((index) => (index + 1) % steps.length);

  return (
    <section className="mt-12 rounded-[28px] border border-[#dfe7df] bg-[#f9fbf7] p-6 shadow-[0_12px_32px_rgba(33,58,43,0.08)] sm:p-8">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#56715b]">Ökosystem</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#20392d]">Nahrungskreislauf im Wald</h2>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="mx-auto w-full max-w-[520px] px-2 py-5 sm:px-6">
          <div className="relative aspect-square w-full">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `rotate(${rotation}deg)` }}
              viewBox="0 0 440 440"
            >
              <defs>
                {arrows.map((arrow, index) => (
                  <marker
                    key={index}
                    id={`cycle-arrow-${index}`}
                    markerWidth="9"
                    markerHeight="9"
                    refX="7"
                    refY="4.5"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M 0 0 L 9 4.5 L 0 9 z" fill={arrow.color} />
                  </marker>
                ))}
              </defs>
              {arrows.map((arrow, index) => (
                <path
                  key={index}
                  d={arrow.d}
                  fill="none"
                  stroke={arrow.color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  markerEnd={`url(#cycle-arrow-${index})`}
                />
              ))}
            </svg>

            {steps.map((step, index) => {
              const angle = (-90 + index * 60 + rotation) * (Math.PI / 180);
              const radius = 184;
              const left = ((220 + Math.cos(angle) * radius) / 440) * 100;
              const top = ((220 + Math.sin(angle) * radius) / 440) * 100;
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute z-10 flex w-[112px] -translate-x-1/2 -translate-y-1/2 flex-col items-center bg-transparent text-center transition-all duration-700 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4e7d66] sm:w-[132px] ${
                    isActive ? "z-20 scale-110" : "scale-100"
                  }`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className={`leading-none ${isActive ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl"}`} aria-hidden="true">
                    {step.icon}
                  </span>
                  <span className="mt-1 text-sm font-bold leading-tight sm:text-base" style={{ color: step.color }}>
                    {step.name}
                  </span>
                  <span className="mt-1 text-[10px] leading-tight text-[#68766e] sm:text-xs">{step.role}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={nextStep}
              aria-label={`Weiter zum nächsten Abschnitt: ${steps[(activeIndex + 1) % steps.length].name}`}
              className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6dfd5] bg-white text-2xl text-[#355c4d] shadow-sm transition hover:bg-[#eef5ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e7d66]"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#dfe7df] bg-white p-5 transition-colors duration-300 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#56715b]">
            Glied {activeIndex + 1} von {steps.length} · Ökologische Rolle
          </p>
          <div className="mt-5 border-l-4 pl-4" style={{ borderColor: activeStep.color }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">{activeStep.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-[#20392d]">{activeStep.name}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color: activeStep.color }}>{activeStep.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4d5f58">{activeStep.description}</p>
            <p className="mt-4 border-t border-[#e8eee8] pt-4 text-sm leading-6 text-[#36594b">
              {activeStep.connection}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}