import Link from "next/link";

export default function SecondPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eaf3f8_0%,#f6f9fb_100%)] px-5 py-12 text-[#213746] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center sm:mb-14">
          <h1 className="text-4xl font-semibold leading-tight text-[#1f465d] sm:text-5xl">Aktuelle Sensordaten</h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-[#5d7482] sm:text-base">
            Die aktuellen Sensordaten aus dem Wald:
          </p>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Temperatur:</p>
          </div>
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Helligkeit:</p>
          </div>
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Luftfeuchtigkeit:</p>
          </div>
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Bodenfeuchtigkeit:</p>
          </div>
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Feuer:</p>
          </div>
          <div className="min-h-[150px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-white p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]">
            <p className="text-sm text-[#617783]">Bewegungssensor:</p>
          </div>
        </div>
        <div>
          <p></p>
        </div>
        <div>
          <p></p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-[#d5e3e9] bg-white/75 px-4 py-2 text-sm font-medium text-[#3d6e88] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#467e9c]"
          >
            Zurück zur Hauptseite
          </Link>
        </div>
      </div>
    </main>
  );
}