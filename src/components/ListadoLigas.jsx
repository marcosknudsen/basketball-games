import League from "./League";
export default function ListadoLigas({ matches }) {

  return (
    <div>
      {[...new Set(matches.map((m) => m.league.id))].map((l) => (
        <League matches={matches.filter((m) => m.league.id == l)} key={l}/>
      ))}
    </div>
  );
}
