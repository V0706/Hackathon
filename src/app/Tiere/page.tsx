import Link from "next/link";

interface Animal {
    art: string;
    aussehen: string;
    ernaehrung: string;
    lebensraum: string;
    besonderheiten: string;
    lebensdauer: number;
}

 const AnimalCard = ({ animal }: { animal: Animal }) => (
    <div
        className="min-h-[280px] rounded-lg border border-[#d5e3e9] border-t-4 border-t-[#5288a3] bg-[#fffdfc] p-6 text-left shadow-[0_12px_32px_rgba(36,81,105,0.09)]"
        key={animal.art} // Use unique identifier for React list rendering
    >
        {/* Card Header */}
        <div className="mb-4 border-b pb-3">
            <h2 className="text-2xl font-bold text-[#0056b3]">{animal.art}</h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-y-4">

            {/* Art */}
            <div className="flex flex-col">
                <span className="text-sm text-[#617783] font-semibold mb-1">Art:</span>
                <span className="text-base text-[#333]">{animal.art}</span>
            </div>

            {/* Aussehen */}
            <div className="flex flex-col">
                <span className="text-sm text-[#617783] font-semibold mb-1">Aussehen:</span>
                <span className="text-base text-[#333]">{animal.aussehen}</span>
            </div>

            {/* Lebensraum */}
            <div className="flex flex-col">
                <span className="text-sm text-[#617783] font-semibold mb-1">Lebensraum:</span>
                <span className="text-base text-[#333]">{animal.lebensraum}</span>
            </div>

            {/* Ernährung */}
            <div className="flex flex-col">
                <span className="text-sm text-[#617783] font-semibold mb-1">Ernährung:</span>
                <span className="text-base text-[#333]">{animal.ernaehrung}</span>
            </div>

            {/* Lebensdauer */}
            <div className="flex flex-col">
                <span className="text-sm text-[#617783] font-semibold mb-1">Lebensdauer:</span>
                <span className="text-base text-[#333]">{animal.lebensdauer} Jahre</span>
            </div>

            {/* Besonderheiten (Full Width) */}
            <div className="flex flex-col col-span-full pt-2 border-t border-[#e0e0e0] mt-2">
                <span className="text-sm text-[#617783] font-semibold mb-1">Besonderheiten:</span>
                <span className="text-base text-[#333] leading-relaxed">{animal.besonderheiten}</span>
            </div>
        </div>
    </div>
);

// Data structure and component definition
// NOTE: Since this is a functional component, the data array must be defined
// at the top level or passed via props/state.
const sampleAnimals: Animal[] = [
    {
        art: "Der Löwe (Panthera leo)",
        aussehen: "Große, muskulöse Katze mit charakteristischem Mähnen-Bald.",
        ernaehrung: "Karnivor; hauptsächlich große Pflanzenfresser (z.B. Zebras, Büffel).",
        lebensraum: "Savannengebiete und buschige Savannen in Afrika.",
        besonderheiten: "Die männliche Mähne ist besonders auffällig und dient einem Signalzweck.",
        lebensdauer: 15,
    },
    {
        art: "Der Tiger (Panthera tigris)",
        aussehen: "Stark gestreifter Großkatze mit kräftiger Statur.",
        ernaehrung: "Carnivor; Beutetiere wie Wildschweine und Hirsche.",
        lebensraum: "Mangrovenwälder und dichte Wälder Asiens.",
        besonderheiten: "Kann hervorragend im dichten Unterholz und bei Nacht lauern.",
        lebensdauer: 10,
    },
    // Add more animals here to fill the cards
];


export default function SecondPage() {
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f5eceb_0%,#fbf7f6_100%)] px-5 py-12 text-[#422e2d] sm:px-8 sm:py-16">
            <div className="mx-auto max-w-6xl">

                {/* Title and Subtitle Section */}
                <header className="mb-10 text-center sm:mb-14">
                    <h1 className="text-4xl font-semibold leading-tight text-[#6e302e] sm:text-5xl">Tierprofil</h1>
                    <h2 className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#826462] sm:text-base">Detaillierte Informationen über wilde Arten und ihre Lebensweise.</h2>
                </header>

                {/* Animal Cards Grid: Uses map function to render multiple cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {sampleAnimals.map((animal) => (
                        <AnimalCard key={animal.art} animal={animal} />
                    ))}
                </div>

                {/* Back Button Section */}
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
    );
}