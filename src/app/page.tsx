import Link from "next/link";

const insects = [
  { name: "schmetterling", emoji: "🦋", tone: "butterfly" },
  { name: "marienkäfer", emoji: "🐞", tone: "ladybird" },
  { name: "honigbiene", emoji: "🐝", tone: "bee" },
  { name: "ameise", emoji: "🐜", tone: "ant" },
  { name: "raupe", emoji: "🐛", tone: "caterpillar" },
  { name: "heuschrecke", emoji: "🦗", tone: "grasshopper" },
  { name: "käfer", emoji: "🪲", tone: "beetle" },
  { name: "fliege", emoji: "🪰", tone: "fly" },
];

const tips = [
  "Bei Sonne flattern Schmetterlinge gern über die Wiese.",
  "Bienen besuchen am liebsten offene Blüten.",
  "Nach Regen lohnt sich ein Blick unter große Blätter.",
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Dein kleiner Gartenblick</p>
        <h1>Krabbelwetter</h1>
        <p className="page-intro">
          Wie fühlt sich der Garten heute an, und wer ist unterwegs?
        </p>
      </header>

      <section className="overview-grid" aria-label="Wetter und Gartentipps">
        <article className="info-panel weather-panel">
          <div className="panel-heading">
            <span className="panel-icon weather-icon" aria-hidden="true">
              ☀️
            </span>
            <div>
              <p className="panel-kicker">HEUTE IM GARTEN</p>
              <h2>Das Wetter</h2>
            </div>
          </div>
          <dl className="weather-readings">
            <div className="reading">
              <dt>Temperatur</dt>
              <dd>20 <span>°C</span></dd>
            </div>
            <div className="reading">
              <dt>Luftfeuchtigkeit</dt>
              <dd>50 <span>%</span></dd>
            </div>
            <div className="reading">
              <dt>Bodenfeuchtigkeit</dt>
              <dd>60 <span>%</span></dd>
            </div>
          </dl>
        </article>

        <article className="info-panel tips-panel">
          <div className="panel-heading">
            <span className="panel-icon tips-icon" aria-hidden="true">
              🌱
            </span>
            <div>
              <p className="panel-kicker">KLEINE ENTDECKERTIPPS</p>
              <h2>Was kommt?</h2>
            </div>
          </div>
          <ul className="tip-list">
            {tips.map((tip, index) => (
              <li key={tip}>
                <span className="tip-number">0{index + 1}</span>
                <p>{tip}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <hr className="section-divider" />

      <section className="insects-section" aria-labelledby="insects-heading">
        <div className="insects-heading">
          <div>
            <p className="panel-kicker">KLEINE GARTENBESUCHER</p>
            <h2 id="insects-heading">Wer krabbelt und flattert?</h2>
          </div>
          <span className="insect-count">{insects.length} entdeckt</span>
          <Link
        href="/feuer"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-700"
      >
        Zur feuer Seite
      </Link>
      <Link
        href="/second"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-700"
      >
        Zur wetter Seite
      </Link>
      <Link
        href="/third"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-700"
      >
        Zur tier Seite
      </Link>
    </div>

        <ul className="insect-grid">
          {insects.map((insect) => (
            <li className="insect-item" key={insect.name}>
              <div className={`insect-picture ${insect.tone}`}>
                <span role="img" aria-label={insect.name}>
                  {insect.emoji}
                </span>
              </div>
              <p>{insect.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
