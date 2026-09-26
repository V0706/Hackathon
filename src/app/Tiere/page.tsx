import Link from "next/link";

export default function SecondPage() {
  return (

      <main className="min-h-screen bg-[linear-gradient(180deg,#f5eceb_0%,#fbf7f6_100%)] px-5 py-12 text-[#422e2d] sm:px-8 sm:py-16">
          <div className="mx-auto max-w-6xl">

              {/* New Title and Subtitle Section */}
              <header className="mb-10 text-center sm:mb-14">
                  <h1 className="text-4xl font-semibold leading-tight text-[#6e302e] sm:text-5xl">Tierprofil</h1>
                  <h2 className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#826462] sm:text-base">Detaillierte Informationen über wilde Arten und ihre Lebensweise.</h2>
              </header>

              {/* Profile Cards Grid: Displays multiple animal cards */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                  {/* ------------------------------------------------------ */}
                  {/* CARD 1: Lion Profile Card */}
                  {/* ------------------------------------------------------ */}
                  <div className="min-h-[280px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">

                      {/* Card Header */}
                      <div className="mb-4 border-b pb-3">
                          <h2 className="text-2xl font-bold text-[#0056b3]">{`Der Löwe (Panthera leo)`}</h2>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-y-4">

                          {/* Art */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Art:</span>
                              <span className="text-base text-[#333]">Panthera leo</span>
                          </div>

                          {/* Aussehen */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Aussehen:</span>
                              <span className="text-base text-[#333]">Große, muskulöse Katze mit charakteristischem Mähnen-Bald.</span>
                          </div>

                          {/* Lebensraum */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensraum:</span>
                              <span className="text-base text-[#333]">Savannengebiete und buschige Savannen in Afrika.</span>
                          </div>

                          {/* Ernährung */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Ernährung:</span>
                              <span className="text-base text-[#333]">Karnivor; hauptsächlich große Pflanzenfresser (z.B. Zebras, Büffel).</span>
                          </div>

                          {/* Lebensdauer */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensdauer:</span>
                              <span className="text-base text-[#333]">Bis zu 15 Jahre in freier Wildbahn.</span>
                          </div>

                          {/* Besonderheiten (Full Width) */}
                          <div className="flex flex-col col-span-full pt-2 border-t border-[#e0e0e0] mt-2">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Besonderheiten:</span>
                              <span className="text-base text-[#333] leading-relaxed">Die männliche Mähne ist besonders auffällig und dient einem Signalzweck.</span>
                          </div>
                      </div>
                  </div>

                  <div className="min-h-[280px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">

                      {/* Card Header */}
                      <div className="mb-4 border-b pb-3">
                          <h2 className="text-2xl font-bold text-[#0056b3]">{`Der Löwe (Panthera leo)`}</h2>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-y-4">

                          {/* Art */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Art:</span>
                              <span className="text-base text-[#333]">Panthera leo</span>
                          </div>

                          {/* Aussehen */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Aussehen:</span>
                              <span className="text-base text-[#333]">Große, muskulöse Katze mit charakteristischem Mähnen-Bald.</span>
                          </div>

                          {/* Lebensraum */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensraum:</span>
                              <span className="text-base text-[#333]">Savannengebiete und buschige Savannen in Afrika.</span>
                          </div>

                          {/* Ernährung */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Ernährung:</span>
                              <span className="text-base text-[#333]">Karnivor; hauptsächlich große Pflanzenfresser (z.B. Zebras, Büffel).</span>
                          </div>

                          {/* Lebensdauer */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensdauer:</span>
                              <span className="text-base text-[#333]">Bis zu 15 Jahre in freier Wildbahn.</span>
                          </div>

                          {/* Besonderheiten (Full Width) */}
                          <div className="flex flex-col col-span-full pt-2 border-t border-[#e0e0e0] mt-2">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Besonderheiten:</span>
                              <span className="text-base text-[#333] leading-relaxed">Die männliche Mähne ist besonders auffällig und dient einem Signalzweck.</span>
                          </div>
                      </div>
                  </div>

                  <div className="min-h-[280px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">

                      {/* Card Header */}
                      <div className="mb-4 border-b pb-3">
                          <h2 className="text-2xl font-bold text-[#0056b3]">{`Der Löwe (Panthera leo)`}</h2>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-y-4">

                          {/* Art */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Art:</span>
                              <span className="text-base text-[#333]">Panthera leo</span>
                          </div>

                          {/* Aussehen */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Aussehen:</span>
                              <span className="text-base text-[#333]">Große, muskulöse Katze mit charakteristischem Mähnen-Bald.</span>
                          </div>

                          {/* Lebensraum */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensraum:</span>
                              <span className="text-base text-[#333]">Savannengebiete und buschige Savannen in Afrika.</span>
                          </div>

                          {/* Ernährung */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Ernährung:</span>
                              <span className="text-base text-[#333]">Karnivor; hauptsächlich große Pflanzenfresser (z.B. Zebras, Büffel).</span>
                          </div>

                          {/* Lebensdauer */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Lebensdauer:</span>
                              <span className="text-base text-[#333]">Bis zu 15 Jahre in freier Wildbahn.</span>
                          </div>

                          {/* Besonderheiten (Full Width) */}
                          <div className="flex flex-col col-span-full pt-2 border-t border-[#e0e0e0] mt-2">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Besonderheiten:</span>
                              <span className="text-base text-[#333] leading-relaxed">Die männliche Mähne ist besonders auffällig und dient einem Signalzweck.</span>
                          </div>
                      </div>
                  </div>


                  {/* ------------------------------------------------------ */}
                  {/* CARD 2: Duplicate or Example Card (Kept for structure) */}
                  {/* ------------------------------------------------------ */}
                  <div className="min-h-[280px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">

                      {/* Card Header */}
                      <div className="mb-4 border-b pb-3">
                          <h2 className="text-2xl font-bold text-[#0056b3]">Weitere Tierart</h2>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-y-4">
                          {/* Example empty slot */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Merkmale:</span>
                              <span className="text-base text-[#333]">Platzhalter für zusätzliche Informationen.</span>
                          </div>
                          {/* Example empty slot */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Klima:</span>
                              <span className="text-base text-[#333]">Anpassung an diverse Regionen.</span>
                          </div>
                          {/* Repeating the structure for visual balance */}
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Details 3:</span>
                              <span className="text-base text-[#333]">Weitere allgemeine Fakten.</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Details 4:</span>
                              <span className="text-base text-[#333]">Zusätzliche Beobachtungen.</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Details 5:</span>
                              <span className="text-base text-[#333]">Wichtige Hinweise.</span>
                          </div>
                          <div className="flex flex-col col-span-full pt-2 border-t border-[#e0e0e0] mt-2">
                              <span className="text-sm text-[#617783] font-semibold mb-1">Zusammenfassend:</span>
                              <span className="text-base text-[#333] leading-relaxed">Hier können zusammenfassende Texte platziert werden.</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Back Button Section (Link Component) */}
              <div className="mt-10 text-center">
                  <Link
                      href="/"
                      className="inline-flex items-center rounded-md border border-[#d5e3e9] bg-white/75 px-6 py-3 text-sm font-medium text-[#8a4945] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4514a]"
                  >
                      Zurück zur Hauptseite
                  </Link>
              </div>
          </div>
      </main>
)
}