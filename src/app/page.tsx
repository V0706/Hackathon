import Image from "next/image";
import Link from "next/link";import MyFeat from "./feature/myfeat";

export default function Home() {
  return (
    <div><div>
      <h1>Name-Name</h1>
    </div>
    <div style={{ height: '500px' }}>
      <ul>
        <li><h3>Temperatur:</h3><h3> 20°C</h3></li>
        <li><h3>Luftfeuchtigkeit:</h3><h3> 50%</h3></li>
        <li><h3>Bodenfeuchtigkeit:</h3><h3> 60%</h3></li>
      </ul>
    <a href="/feature/myfeat.tsx">Link</a>
     
    </div>
          <Link
        href="/second"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-700"
      >
        Zur Wetterdaten Seite
      </Link>
      <Link
        href="/third"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-700"
      >
        Zur Tiervorlage Seite
      </Link>
    </div>
    
    
  );
}
