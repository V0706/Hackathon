import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waldmonitor | Waldanalyse",
  description: "Übersicht zu Wetterdaten, Waldbrandgefahr und Tierbeobachtungen.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef3eb_0%,#f8f8f3_100%)] px-5 py-12 text-[#1d3028] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase text-[#557263]">
            Sensorbasierte Lageübersicht
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[#193b2d] sm:text-5xl">
            Waldmonitor
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#5d6b63] sm:text-base">
            Wetter, Waldbrandgefahr und Tierbeobachtungen auf einen Blick.
          </p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8e2d8] bg-white/75 px-3 py-1.5 text-xs text-[#65736b]">
            <span className="size-2 rounded-full bg-[#cb9651]" aria-hidden="true" />
            Demo-Daten · Sensorbox noch nicht verbunden
          </p>
        </header>

        <section
          aria-label="Waldübersicht"
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3"
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

            <dl className="mt-7 grid grid-cols-1 divide-y divide-[#e7ece6] border-t border-[#e7ece6] pt-1">
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-xs leading-5 text-[#748078]">Temperatur</dt>
                <dd className="mt-1 text-lg font-semibold text-[#284b38]">20 <span className="text-sm font-medium">°C</span></dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-xs leading-5 text-[#748078]">Luftfeuchte</dt>
                <dd className="mt-1 text-lg font-semibold text-[#284b38]">50 <span className="text-sm font-medium">%</span></dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-xs leading-5 text-[#748078]">Bodenfeuchte</dt>
                <dd className="mt-1 text-lg font-semibold text-[#284b38]">60 <span className="text-sm font-medium">%</span></dd>
              </div>
            </dl>
            <p className="mt-auto pt-5 text-xs text-[#8a958e]">Beispielwerte · letzte Messung 10:42</p>
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
      </div>
    </main>
  );
}
