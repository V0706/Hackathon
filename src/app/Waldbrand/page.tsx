import Link from "next/link";
import MqttWaldbrandGefahr from "./MqttWaldbrandGefahr";

export default function SecondPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5eceb_0%,#fbf7f6_100%)] px-5 py-12 text-[#422e2d] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center sm:mb-14">
          <h1 className="text-4xl font-semibold leading-tight text-[#6e302e] sm:text-5xl">Waldbrände</h1>
          <h2 className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-[#826462] sm:text-base">
            Gefahr für Pflanzen und Tiere.
          </h2>
        </header>

        <div className="mb-8">
          <MqttWaldbrandGefahr />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="min-h-[220px] rounded-lg border border-[#ead8d4] border-t-4 border-t-[#b45d55] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(93,45,40,0.09)]">
            <h2 className="text-xl font-semibold text-[#4a302e]">Wie entstehen Waldbrände?</h2>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Waldbrände werden begünstigt, wenn es besonders warm und trocken ist. Natürliche Ursachen wie Blitzeinschläge lösen selten Waldbrände aus. Viel eher werden sie durch Menschen verursacht, wie etwa durch vorsätzliche Brandstiftung oder unkontrollierte Feuer. Auch Zigarretten, die achtlos weggeworfen wurden und heiße Fahrzeugkatalysatoren können Waldbrände verursachen.</p>
          </div>
          <div className="min-h-[220px] rounded-lg border border-[#ead8d4] border-t-4 border-t-[#b45d55] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(93,45,40,0.09)]">
            <h2 className="text-xl font-semibold text-[#4a302e]">Wie kann man Waldbrände verhindern?</h2>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Um Waldbrände zu verhindern, ist es wichtig, vorsichtig mit Feuer umzugehen, keine offenen Flammen in Waldgebieten zu verwenden und auf die Einhaltung von Brandschutzvorschriften zu achten. Außerdem sollten Fahrzeuge nicht auf trockenen Wiesen oder Waldboden geparkt werden.</p>
          </div>
          <div className="min-h-[220px] rounded-lg border border-[#ead8d4] border-t-4 border-t-[#b45d55] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(93,45,40,0.09)]">
            <h2 className="text-xl font-semibold text-[#4a302e]">Welche Bedingungen für Waldbrände sind aktuellerfüllt?</h2>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Hohe Temperaturenn:</p>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Geringe Luftfeuchtigkeit:</p>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Dürre:</p>
     
          </div>
          <div className="min-h-[220px] rounded-lg border border-[#ead8d4] border-t-4 border-t-[#b45d55] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(93,45,40,0.09)]">
            <h2 className="text-xl font-semibold text-[#4a302e]">Brennt es gerade?</h2>
            <p className="mt-3 text-sm leading-6 text-[#77615e]">Platzhalter für Sensor:</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-[#ead8d4] bg-white/75 px-4 py-2 text-sm font-medium text-[#8a4945] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4514a]"
          >
            Zurück zur Hauptseite
          </Link>
        </div>
      </div>
    </main>
  );
}