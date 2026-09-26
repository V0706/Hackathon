import Link from "next/link";
import type { Metadata } from "next";
import MqttStartseitenwerte from "./MqttStartseitenwerte";

export const metadata: Metadata = {
  title: "Waldmonitor | Waldanalyse",
  description: "Übersicht zu Wetterdaten, Waldbrandgefahr und Tierbeobachtungen.",
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
            Wetter, Waldbrandgefahr und Tierbeobachtungen auf einen Blick.
          </p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8e2d8] bg-white/75 px-3 py-1.5 text-xs text-[#65736b]">
            <span className="size-2 rounded-full bg-[#cb9651]" aria-hidden="true" />
            Live-Sensordaten · Station WM-04
          </p>
        </header>

        <section
          aria-label="Beobachtungsgebiet Nordhang"
          className="relative mb-6 flex min-h-[170px] items-center overflow-hidden rounded-lg bg-[#1d3b2e] shadow-[0_14px_34px_rgba(25,52,38,0.18)]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(14, 37, 27, 0.9) 0%, rgba(18, 47, 33, 0.68) 48%, rgba(18, 47, 33, 0.12) 100%), url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=85')",
            }}
          />
          <div className="relative z-10 flex w-full items-end justify-between gap-8 px-9 py-7 text-white">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-[#c2d5c4]">Beobachtungsgebiet · Sektor 04</p>
              <h2 className="font-serif text-3xl font-semibold">Nordhang-Mischwald</h2>
              <p className="mt-2 text-sm text-white/75">Sensorstation WM-04 <span className="mx-2 text-white/40">/</span> Höhenlage 640 m</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-md border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e5b36e] opacity-40" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#e5b36e]" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">MQTT-Sensor</p>
                <p className="mt-0.5 text-[11px] text-white/65">garten/status/#</p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Waldübersicht"
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3"
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
            className="group flex min-h-[370px] flex-col rounded-lg border border-t-4 border-[#e8dfd1] border-t-[#b67b48] bg-[#fffdfa] p-7 shadow-[0_12px_32px_rgba(70,51,31,0.09)] transition duration-200 hover:-translate-y-1 hover:border-[#c7a478] hover:shadow-[0_18px_36px_rgba(70,51,31,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a97943]"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-md bg-[#f7ead8] text-[#a66d36]">
                <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.4 3.5c1 5-3.6 6.3-2.5 10.5 0 0-2.6-.7-3.2-3.2C8.4 14 7 17 7 20a9 9 0 0 0 18 0c0-5.5-4-9.7-7.6-16.5Z" />
                  <path d="M16.2 17.5c.4 2.3-2.1 3.4-2.1 5.2a2.9 2.9 0 0 0 5.8 0c0-1.8-1.2-3.4-3.7-5.2Z" />
                </svg>
              </span>
              <span className="mt-1 text-[#988d7e] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
            <p className="mb-2 text-xs font-bold uppercase text-[#98734c]">Risikoeinschätzung</p>
            <h2 className="text-xl font-semibold text-[#403326]">Waldbrandgefahr</h2>
            <p className="mt-2 text-sm text-[#776d61]">Aktuelles Gefahrenlevel</p>

            <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#eee7dc] pt-5">
              <div>
                <p className="text-xs text-[#81776b]">Gefahrenstufe</p>
                <p className="mt-1 text-3xl font-semibold text-[#8d5b2d]">2 <span className="text-base font-medium text-[#887867]">/ 5</span></p>
              </div>
              <span className="rounded-md border border-[#ead5b7] bg-[#fbf0df] px-3 py-1.5 text-sm font-semibold text-[#8d5b2d]">Mäßig</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-1.5" aria-label="Gefahrenstufe 2 von 5">
              <span className="h-1.5 rounded-full bg-[#6d9a70]" />
              <span className="h-1.5 rounded-full bg-[#c58b4c]" />
              <span className="h-1.5 rounded-full bg-[#e7e3dc]" />
              <span className="h-1.5 rounded-full bg-[#e7e3dc]" />
              <span className="h-1.5 rounded-full bg-[#e7e3dc]" />
            </div>
            <p className="mt-auto pt-5 text-xs text-[#9a8e80]">Beispiel-Einstufung · keine Live-Warnung</p>
          </Link>

          <Link
            href="/Tiere"
            className="group flex min-h-[370px] flex-col rounded-lg border border-t-4 border-[#dce4e1] border-t-[#4e8177] bg-[#fbfdfc] p-7 shadow-[0_12px_32px_rgba(33,58,43,0.09)] transition duration-200 hover:-translate-y-1 hover:border-[#8ba99c] hover:shadow-[0_18px_36px_rgba(33,58,43,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#52766a]"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-md bg-[#e4efec] text-[#477568]">
                <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.2 17.5c-2.8 0-5.2 3-5.2 5.6 0 1.7 1 2.8 2.7 2.8 2.2 0 4.5-2 8.3-2s6.1 2 8.3 2c1.7 0 2.7-1.1 2.7-2.8 0-2.6-2.4-5.6-5.2-5.6-2.2 0-3.7 1.9-6 1.9s-3.8-1.9-6-1.9Z" />
                  <ellipse cx="8" cy="11" rx="2.2" ry="2.8" transform="rotate(-25 8 11)" />
                  <ellipse cx="13.3" cy="8.5" rx="2.1" ry="2.7" transform="rotate(-10 13.3 8.5)" />
                  <ellipse cx="18.7" cy="8.5" rx="2.1" ry="2.7" transform="rotate(10 18.7 8.5)" />
                  <ellipse cx="24" cy="11" rx="2.2" ry="2.8" transform="rotate(25 24 11)" />
                </svg>
              </span>
              <span className="mt-1 text-[#82918b] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
            <p className="mb-2 text-xs font-bold uppercase text-[#638078]">Fauna &amp; Bewegung</p>
            <h2 className="text-xl font-semibold text-[#203b34]">Tierbeobachtung</h2>
            <p className="mt-2 text-sm text-[#697770]">Aktivität im Beobachtungsgebiet</p>

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#e6ece9] pt-5">
              <div>
                <p className="text-xs text-[#748078]">Sichtungen</p>
                <p className="mt-1 text-2xl font-semibold text-[#315d50]">12</p>
              </div>
              <div>
                <p className="text-xs text-[#748078]">Arten erkannt</p>
                <p className="mt-1 text-2xl font-semibold text-[#315d50]">4</p>
              </div>
            </div>
            <p className="mt-auto pt-5 text-xs text-[#89948e]">Beispielbeobachtungen · letzte 24 Stunden</p>
          </Link>
        </section>

        <section aria-label="Messverlauf und letzte Meldungen" className="mt-6 grid grid-cols-[1.45fr_0.85fr] gap-5">
          <article className="rounded-lg border border-[#d6dfd5] bg-white p-6 shadow-[0_8px_24px_rgba(33,58,43,0.06)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase text-[#688071]">Sensor WM-04 · Temperatur</p>
                <h2 className="text-lg font-semibold text-[#20392d]">Messverlauf</h2>
              </div>
              <p className="rounded-sm bg-[#f1f4ee] px-2.5 py-1.5 text-[11px] font-medium text-[#728076]">Letzte 24 Stunden · Demo</p>
            </div>
            <div className="mt-4 flex items-end gap-5">
              <svg viewBox="0 0 600 132" role="img" aria-label="Beispielhafter Temperaturverlauf von 12 bis 20 Grad" className="h-[112px] min-w-0 flex-1 overflow-visible">
                <path d="M38 15H590M38 48H590M38 81H590M38 114H590" stroke="#e8ede7" strokeWidth="1" />
                <path d="M38 15V114" stroke="#d8e1d8" strokeWidth="1" />
                <path d="M38 98 C82 94 106 89 144 88 S211 73 248 77 S314 61 351 65 S418 43 455 49 S524 31 590 37 V114 H38Z" fill="url(#temperature-area)" />
                <path d="M38 98 C82 94 106 89 144 88 S211 73 248 77 S314 61 351 65 S418 43 455 49 S524 31 590 37" fill="none" stroke="#527b5e" strokeWidth="3" strokeLinecap="round" />
                <circle cx="590" cy="37" r="4.5" fill="#527b5e" stroke="white" strokeWidth="2" />
                <defs>
                  <linearGradient id="temperature-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#83a98a" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#83a98a" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <text x="0" y="19" fill="#859188" fontSize="10">24°</text>
                <text x="0" y="52" fill="#859188" fontSize="10">19°</text>
                <text x="0" y="85" fill="#859188" fontSize="10">14°</text>
                <text x="0" y="118" fill="#859188" fontSize="10">9°</text>
                <text x="38" y="130" fill="#859188" fontSize="10">00:00</text>
                <text x="215" y="130" fill="#859188" fontSize="10">06:00</text>
                <text x="395" y="130" fill="#859188" fontSize="10">12:00</text>
                <text x="555" y="130" fill="#859188" fontSize="10">18:00</text>
              </svg>
              <div className="w-28 shrink-0 border-l border-[#e6ece5] pl-5 pb-2">
                <p className="text-[11px] text-[#748078]">Aktuell</p>
                <p className="mt-1 text-2xl font-semibold text-[#284b38]">20<span className="ml-0.5 text-sm">°C</span></p>
                <p className="mt-2 text-[11px] font-medium text-[#688071]">+4° seit 06:00</p>
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-[#d6dfd5] bg-[#fbfcf9] p-6 shadow-[0_8px_24px_rgba(33,58,43,0.06)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase text-[#688071]">Fauna · Demo</p>
                <h2 className="text-lg font-semibold text-[#20392d]">Letzte Meldungen</h2>
              </div>
              <Link href="/Tiere" className="pt-1 text-xs font-semibold text-[#52745e] hover:text-[#294a35]">Alle ansehen <span aria-hidden="true">↗</span></Link>
            </div>
            <ul className="mt-4 divide-y divide-[#e5ebe4]">
              <li className="flex items-center gap-3 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#e9efe4] text-sm" aria-hidden="true">01</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#31483a]">Rehwild</p>
                  <p className="mt-0.5 truncate text-xs text-[#7a867d]">Östlicher Waldrand · 09:18</p>
                </div>
                <span className="text-[10px] font-medium uppercase text-[#7d8c80]">Demo</span>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#f0ebe1] text-sm" aria-hidden="true">02</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#31483a]">Rotfuchs</p>
                  <p className="mt-0.5 truncate text-xs text-[#7a867d]">Waldweg Nord · 07:42</p>
                </div>
                <span className="text-[10px] font-medium uppercase text-[#7d8c80]">Demo</span>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#e5eeec] text-sm" aria-hidden="true">03</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#31483a]">Schwarzspecht</p>
                  <p className="mt-0.5 truncate text-xs text-[#7a867d]">Sektor Nord · 06:15</p>
                </div>
                <span className="text-[10px] font-medium uppercase text-[#7d8c80]">Demo</span>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
