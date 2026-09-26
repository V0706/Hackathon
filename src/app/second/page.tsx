import Link from "next/link";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-900 px-6 pb-16 pt-5 text-center text-white">
      <h1 className="mb-6 text-4xl font-bold">Aktuelle Wetterdaten</h1>
      <p className="mb-8 max-w-md text-lg text-zinc-300">
       Die aktuellen Wetterdaten aus dem Wald:
      </p>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="flex h-[150px] w-[300px] items-start justify-start rounded-lg bg-blue-500 p-3">
          <p>Temperatur:</p>
        </div>
        <div className="flex h-[150px] w-[300px] items-start justify-start rounded-lg bg-blue-500 p-3">
          <p>Helligkeit:</p>
        </div>
        <div className="flex h-[150px] w-[300px] items-start justify-start rounded-lg bg-blue-500 p-3">
          <p>Luftfeuchtigkeit:</p>
        </div>
        <div className="flex h-[150px] w-[300px] items-start justify-start rounded-lg bg-blue-500 p-3">
          <p>Bodenfeuchtigkeit:</p>
        </div>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>

      <Link
        href="/"
       className="mt-[10px] rounded-full bg-white px-6 py-3 text-black transition hover:bg-zinc-300"
      >
        Zurück zur Hauptseite
      </Link>
    </main>
  );
}