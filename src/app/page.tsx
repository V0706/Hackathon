import Link from "next/link";
import type { Metadata } from "next";
import FoodChainCycle from "./FoodChainCycle";
import MqttStartseitenwerte from "./MqttStartseitenwerte";
import MqttWaldbrandGefahr from "./Waldbrand/MqttWaldbrandGefahr";
import TierGalerie from "./TierGalerie";

export const metadata: Metadata = {
  title: "Waldmonitor | Waldanalyse",
  description: "Übersicht zu Wetterdaten, Waldbrandgefahr und Artenvielfalt im Wald.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#e8eee7_0%,#f5f6f0_100%)] px-8 py-7 text-[#1d3028]">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-7 text-center">
          <span className="mx-auto mb-4 grid size-12 place-items-center rounded-lg border border-[#d0ddd0] bg-white/80 text-[#52745e] shadow-sm">
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 27V13m0 8c-5.5 0-9-3.5-9-9 5.5 0 9 3.5 9 9Zm0-5c0-5 3-8 8-8 0 5-3 8-8 8Z" />
            </svg>
          </span>
          <p className="mb-2 text-xs font-bold uppercase text-[#557263]">
            Waldanalyse · Sensornetz
          </p>
          <h1 className="font-serif text-6xl font-semibold leading-tight text-[#193b2d]">
            Wald<span className="text-[#66866b]">monitor</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-[#5d6b63]">
            Wetter und Waldbrandgefahr im Überblick. Entdecke die Artenvielfalt im Wald.
          </p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8e2d8] bg-white/75 px-3 py-1.5 text-xs text-[#65736b]">
            <span className="size-2 rounded-full bg-[#cb9651]" aria-hidden="true" />
            Live-Sensordaten · Station WM-04
          </p>
        </header>

        <section
          aria-label="Beobachtungsgebiet Eggegebirge"
          className="relative mb-6 flex min-h-[170px] items-center overflow-hidden rounded-lg bg-[#1d3b2e] shadow-[0_14px_34px_rgba(25,52,38,0.18)]"
        >
          <div
            className="forest-pan absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(14, 37, 27, 0.9) 0%, rgba(18, 47, 33, 0.68) 48%, rgba(18, 47, 33, 0.12) 100%), url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=85')",
            }}
          />
          <div className="relative z-10 flex w-full items-end justify-between gap-8 px-9 py-7 text-white">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-[#c2d5c4]">Beobachtungsgebiet · Sektor 04</p>
              <h2 className="font-serif text-3xl font-semibold">Eggegebirge</h2>
              <p className="mt-2 text-sm text-white/75">Sensorstation WM-04 <span className="mx-2 text-white/40">/</span> Höhenlage 253 m</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-md border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e5b36e] opacity-40" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#e5b36e]" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">MQTT-Sensor</p>
                <p className="mt-0.5 text-[11px] text-white/65">Garten/# · 3 Boards</p>
              </div>
            </div>
          </div>
        </section>
z
        <section
          aria-label="Waldübersicht"
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2"
        >
          <Link
            href="/Wetter"
            className="group flex min-h-[370px] flex-col rounded-lg border border-t-4 border-[#dce4da] border-t-[#62866c] bg-white p-7 shadow-[0_12px_32px_rgba(33,58,43,0.09)] transition duration-200 hover:-translate-y-1 hover:border-[#8da996] hover:shadow-[0_18px_36px_rgba(33,58,43,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#52745e]"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-md bg-[#e8f0e8] text-[#426c55]">
                <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="22" cy="10" r="4" />
                  <path d="M22 2v2M22 16v2M14 10h2m12 0h2m-2.3-5.7-1.4 1.4m-8.6 8.6-1.4 1.4m0-11.4 1.4 1.4m8.6 8.6 1.4 1.4" />
                  <path d="M8 25h15a4 4 0 0 0 .4-8 6.5 6.5 0 0 0-12.5 1A3.5 3.5 0 0 0 8 25Z" />
                </svg>
              </span>
              <span className="mt-1 text-[#829187] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
            <p className="mb-2 text-xs font-bold uppercase text-[#63806d]">Umweltmessung</p>
            <h2 className="text-xl font-semibold text-[#20392d]">Wetterdaten</h2>
            <p className="mt-2 text-sm text-[#6b776f]">Aktuelle Messwerte der Sensorbox</p>

            <MqttStartseitenwerte />
          </Link>

          <Link
            href="/Waldbrand"
            className="group block min-h-[370px] rounded-lg border border-t-4 border-[#e8dfd1] border-t-[#b67b48] bg-[#fffdfa] p-3 shadow-[0_12px_32px_rgba(70,51,31,0.09)] transition duration-200 hover:-translate-y-1 hover:border-[#c7a478] hover:shadow-[0_18px_36px_rgba(70,51,31,0.14)]"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-md bg-[#f7ead8] text-[#a66d36]">
                <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.4 3.5c1 5-3.6 6.3-2.5 10.5 0 0-2.6-.7-3.2-3.2C8.4 14 7 17 7 20a9 9 0 0 0 18 0c0-5.5-4-9.7-7.6-16.5Z" />
                  <path d="M16.2 17.5c.4 2.3-2.1 3.4-2.1 5.2a2.9 2.9 0 0 0 5.8 0c0-1.8-1.2-3.4-3.7-5.2Z" />
                </svg>
              </span>
              <span className="mt-1 text-[#988d7e] transition-transform group-hover:translate-x-1" aria-hidden="true">
                ↗
              </span>
            </div>
            <MqttWaldbrandGefahr />
          </Link>

        </section>

        <TierGalerie />
        <FoodChainCycle />
      </div>
    </main>
  );
}
