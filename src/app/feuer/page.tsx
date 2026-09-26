import Link from "next/link";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-6 py-16 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold">Waldbrandgefahr</h1>
        <div className="flex gap-6">
          <div>
            <h2>Wie entstehen Waldbrände?</h2>
            <p>Waldbrände entstehen durch verschiedene Ursachen, darunter natürliche Faktoren wie Blitzschläge und menschliche Aktivitäten wie unkontrollierte Feuer oder Abbrand.</p>
          </div>
          <div>
            <h2>Wie kann man Waldbrände verhindern?</h2>
            <p>Um Waldbrände zu verhindern, ist es wichtig, vorsichtig mit Feuer umzugehen, keine offenen Flammen in Waldgebieten zu verwenden und auf die Einhaltung von Brandschutzvorschriften zu achten.</p>
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