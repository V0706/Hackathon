"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const animals = [
  {
    name: "Heuschrecke",
    scientificName: "Roesels Beißschrecke · Roeseliana roeselii",
    role: "Pflanzenfresser",
    image: "https://images.unsplash.com/photo-1523056942078-07757f80b0dc?auto=format&fit=crop&w=960&q=85",
    imageAlt: "Grüne und braune Heuschrecke im Gras",
    credit: "Krzysztof Niewolny · Unsplash",
    creditUrl: "https://unsplash.com/photos/brown-and-green-grasshopper-on-green-in-selective-focus-photography-during-daytime-3-DLRoHjotI",
    size: "Etwa 13 bis 26 mm",
    food: "Gräser und andere Pflanzenteile",
    habitat: "Wiesen, lichte Waldränder und hohes Gras",
    contribution: "Sie ist Nahrung für Vögel und andere Kleintiere und beeinflusst zugleich den Pflanzenbestand.",
    fact: "Männchen erzeugen ihren arttypischen Gesang durch Stridulation, also das Aneinanderreiben von Körperteilen.",
  },
  {
    name: "Marienkäfer",
    scientificName: "Siebenpunkt-Marienkäfer · Coccinella septempunctata",
    role: "Räuber und Nützling",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Coccinella_septempunctata%2C_macro.jpg/500px-Coccinella_septempunctata%2C_macro.jpg",
    imageAlt: "Siebenpunkt-Marienkäfer in einer Makroaufnahme",
    credit: "Maja Kolarski · CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Coccinella_septempunctata,_macro.jpg",
    size: "Etwa 5 bis 8 mm",
    food: "Vor allem Blattläuse und andere kleine Insekten",
    habitat: "Gärten, Wiesen, Waldränder und Gebüsche",
    contribution: "Als Räuber hält er Blattlausbestände in Grenzen. Auch seine Larven jagen Blattläuse.",
    fact: "Die auffälligen Farben warnen Fressfeinde; bei Gefahr kann der Käfer eine unangenehm schmeckende Flüssigkeit abgeben.",
  },
  {
    name: "Wildbiene",
    scientificName: "Gehörnte Mauerbiene · Osmia cornuta",
    role: "Bestäuberin",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Osmia_cornuta_%2832981337403%29.jpg/960px-Osmia_cornuta_%2832981337403%29.jpg",
    imageAlt: "Gehörnte Mauerbiene an einer Blüte",
    credit: "Björn Sothmann · CC BY-SA 2.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Osmia_cornuta_(32981337403).jpg",
    size: "Etwa 10 bis 15 mm",
    food: "Nektar und Pollen",
    habitat: "Blütenreiche Gärten, Streuobstwiesen und Waldränder",
    contribution: "Beim Sammeln von Pollen bestäubt sie Blüten und unterstützt so die Fortpflanzung vieler Pflanzen.",
    fact: "Mauerbienen leben einzeln und legen ihre Brutzellen in vorhandenen Hohlräumen an.",
  },
  {
    name: "Schwebfliege",
    scientificName: "Schwebfliegen · Syrphidae",
    role: "Bestäuberin und Blattlausjägerin",
    image: "https://images.unsplash.com/photo-1788788056489-6fb8ab3d7cef?auto=format&fit=crop&w=960&q=85",
    imageAlt: "Schwebfliege auf einer rosafarbenen Schafgarbenblüte",
    credit: "Vsevolod · Unsplash",
    creditUrl: "https://unsplash.com/photos/hoverfly-on-magenta-yarrow-flowers-FmAO7wLyPBA",
    size: "Je nach Art etwa 7 bis 15 mm",
    food: "Erwachsene Tiere: Nektar und Pollen; viele Larven: Blattläuse",
    habitat: "Blütenreiche Wiesen, Gärten und lichte Waldränder",
    contribution: "Die erwachsenen Fliegen bestäuben Blüten; die Larven vieler Arten helfen, Blattläuse zu reduzieren.",
    fact: "Sie kann scheinbar still in der Luft stehen und ist für Menschen harmlos.",
  },
  {
    name: "Schmetterling",
    scientificName: "Tagfalter · Rhopalocera",
    role: "Bestäuber und Nahrungstier",
    image: "https://images.unsplash.com/photo-1533048324814-79b0a31982f1?auto=format&fit=crop&w=960&q=85",
    imageAlt: "Schmetterling auf einer orangefarbenen Blüte",
    credit: "Yuichi Kageyama · Unsplash",
    creditUrl: "https://unsplash.com/photos/selective-focus-photography-of-butterfly-on-orange-petaled-flower-4ByFHyNdoD4",
    size: "Je nach Art sehr unterschiedlich",
    food: "Raupen fressen artspezifische Pflanzen; Falter trinken meist Nektar",
    habitat: "Blumenwiesen, sonnige Waldränder und lichte Waldwege",
    contribution: "Falter bestäuben Blüten; Raupen und Falter sind Nahrung für Vögel und andere Tiere.",
    fact: "Schmetterlinge durchlaufen Ei, Raupe und Puppe, bevor der erwachsene Falter schlüpft.",
  },
  {
    name: "Hummel",
    scientificName: "Hummeln · Bombus",
    role: "Bestäuberin",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bumblebee_on_a_purple_flower.jpg/960px-Bumblebee_on_a_purple_flower.jpg",
    imageAlt: "Hummel auf einer violetten Blüte",
    credit: "26D · CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Bumblebee_on_a_purple_flower.jpg",
    size: "Je nach Art und Geschlecht etwa 8 bis 25 mm",
    food: "Nektar als Energiequelle und Pollen für die Brut",
    habitat: "Blütenreiche Landschaften, Gärten und Waldränder",
    contribution: "Sie bestäubt zahlreiche Wild- und Kulturpflanzen, auch bei kühlerem Wetter.",
    fact: "Hummeln bilden kleine einjährige Staaten; nur die begatteten Jungköniginnen überwintern.",
  },
];

export default function TierGalerie() {
  const [selectedAnimal, setSelectedAnimal] = useState<(typeof animals)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedAnimal && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedAnimal]);

  return (
    <section className="mt-12 border-t border-[#d7e1d7] pt-10" aria-labelledby="tierbereich-title">
      <div className="mb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#56715b]">Artenvielfalt</p>
        <h2 id="tierbereich-title" className="mt-2 font-serif text-3xl font-semibold text-[#20392d]">
          Kleine Bewohner des Waldes
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5d6b63]">
          Insekten bestäuben Pflanzen, regulieren andere Arten und sind selbst Nahrung für viele Waldtiere.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {animals.map((animal) => (
            <button
              key={animal.name}
              type="button"
              aria-haspopup="dialog"
              aria-label={`Steckbrief anzeigen: ${animal.name}`}
              onClick={() => setSelectedAnimal(animal)}
              className="group overflow-hidden rounded-lg border border-[#dce4da] bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#52745e]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e6ece4]">
                <Image
                  src={animal.image}
                  alt={animal.imageAlt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <span className="block px-3 py-3 sm:px-4">
                <span className="block text-sm font-semibold text-[#20392d] sm:text-base">{animal.name}</span>
                <span className="mt-1 block text-[11px] leading-4 text-[#718078]">{animal.role}</span>
              </span>
            </button>
          ))}
      </div>

      {selectedAnimal && (
        <dialog
          ref={dialogRef}
          className="animal-dialog m-auto grid w-[min(920px,calc(100%-2rem))] max-h-[90dvh] overflow-y-auto rounded-lg border-0 bg-[#fbfcf8] p-0 text-[#20392d] shadow-2xl backdrop:bg-[#14251edb] backdrop:backdrop-blur-sm md:grid-cols-[0.95fr_1.05fr]"
          onCancel={(event) => {
            event.preventDefault();
            setSelectedAnimal(null);
          }}
          onClose={() => setSelectedAnimal(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSelectedAnimal(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedAnimal(null);
          }}
        >
            <div className="relative min-h-[240px] bg-[#e6ece4] md:min-h-[560px]">
              <Image
                key={selectedAnimal.name}
                src={selectedAnimal.image}
                alt={selectedAnimal.imageAlt}
                fill
                unoptimized
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <p className="absolute inset-x-0 bottom-0 bg-black/50 px-4 py-2 text-[11px] text-white">
                Bild: <a href={selectedAnimal.creditUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{selectedAnimal.credit}</a>
              </p>
            </div>

            <div className="relative max-h-[85dvh] overflow-y-auto p-5 sm:p-7">
              <button
                type="button"
                autoFocus
                aria-label="Steckbrief schließen"
                onClick={() => setSelectedAnimal(null)}
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-[#dce4da] bg-white text-2xl leading-none text-[#36594b] transition hover:bg-[#eef5ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52745e]"
              >
                <span aria-hidden="true">×</span>
              </button>
              <p className="pr-12 text-[10px] font-bold uppercase tracking-[0.16em] text-[#63806d]">Tiersteckbrief</p>
              <h3 id="animal-profile-title" className="mt-2 pr-10 text-2xl font-semibold text-[#20392d]">{selectedAnimal.name}</h3>
              <p className="mt-1 text-sm italic text-[#718078]">{selectedAnimal.scientificName}</p>
              <p className="mt-4 inline-flex border-l-4 pl-3 text-sm font-semibold text-[#36594b]" style={{ borderColor: "#75a95b" }}>
                {selectedAnimal.role}
              </p>

              <dl className="mt-5 divide-y divide-[#e8eee8] border-y border-[#e8eee8]">
                <div className="grid grid-cols-[92px_1fr] gap-3 py-3 text-sm">
                  <dt className="font-semibold text-[#53675b]">Größe</dt>
                  <dd className="leading-5 text-[#4d5f58]">{selectedAnimal.size}</dd>
                </div>
                <div className="grid grid-cols-[92px_1fr] gap-3 py-3 text-sm">
                  <dt className="font-semibold text-[#53675b]">Nahrung</dt>
                  <dd className="leading-5 text-[#4d5f58]">{selectedAnimal.food}</dd>
                </div>
                <div className="grid grid-cols-[92px_1fr] gap-3 py-3 text-sm">
                  <dt className="font-semibold text-[#53675b]">Lebensraum</dt>
                  <dd className="leading-5 text-[#4d5f58]">{selectedAnimal.habitat}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-[#294631]">Bedeutung im Ökosystem</h4>
                <p className="mt-1 text-sm leading-6 text-[#4d5f58]">{selectedAnimal.contribution}</p>
              </div>
              <div className="mt-4 border-t border-[#e8eee8] pt-4">
                <h4 className="text-sm font-semibold text-[#294631]">Besonderheit</h4>
                <p className="mt-1 text-sm leading-6 text-[#4d5f58]">{selectedAnimal.fact}</p>
              </div>
            </div>
        </dialog>
      )}
    </section>
  );
}