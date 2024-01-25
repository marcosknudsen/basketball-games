import League from "./League";
import order from "../../order.json";
export default function ListadoLigas({ matches }) {
  return (
    <div className="w-3/4 min-w-[600px] max-w-[800px]">
      {[...new Set(matches.map((m) => m.league.id))]
        .sort((a, b) => order.order.indexOf(a) - order.order.indexOf(b))
        .map((l) => (
          <League matches={matches.filter((m) => m.league.id == l)} key={l} />
        ))}
    </div>
  );
}
