import Link from "next/link";
import MqttWetterwerte from "./MqttWetterwerte";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-900 px-6 pb-16 pt-5 text-center text-white">
      <h1 className="mb-6 text-4xl font-bold">Aktuelle Wetterdaten</h1>
      <p className="mb-8 max-w-md text-lg text-zinc-300">
       Die aktuellen Wetterdaten aus dem Wald:
      </p>
      <MqttWetterwerte />
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