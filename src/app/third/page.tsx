import Link from "next/link";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-6 py-16 text-center text-white">
      <h1 className="mb-6 text-4xl font-bold">Tiername</h1>
        <div>
          <div className="self-end border border-gray-300 p-4 text-left">
              <h2 className="text-2xl font-semibold">Steckbrief</h2>
                  <ul>
                      <li>Art: </li>
                      <li>Aussehen: </li>
                      <li>Lebensraum: </li>
                      <li>Ernährung: </li>
                      <li>Lebensdauer: </li>
                      <li>Besonderheiten: </li>

                  </ul>
          </div>
           <div>
              <h3>tach</h3>
          </div>
        </div> 
      <Link
        href="/"
       className="rounded-full bg-white px-6 py-3 text-black transition hover:bg-zinc-300"
      >
        Zurück zur Hauptseite
      </Link>
    </main>
  );
}