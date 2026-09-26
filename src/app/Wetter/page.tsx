import Link from "next/link";
import MqttWetterwerte from "./MqttWetterwerte";

export default function SecondPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eaf3f8_0%,#f6f9fb_100%)] px-5 py-12 text-[#213746] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center sm:mb-14">
          <h1 className="text-4xl font-semibold leading-tight text-[#1f465d] sm:text-5xl">
            Aktuelle Sensordaten
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-[#5d7482] sm:text-base">
            Die aktuellen Sensordaten aus dem Wald:
          </p>
        </header>

        <div className="mt-8 flex justify-center">
          <MqttWetterwerte />
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