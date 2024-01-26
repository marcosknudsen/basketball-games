import League from "./League";
import order from "../../order.json";
export default function ListadoLigas({ matches }) {
  return (
    <div className="w-3/4 min-w-[600px] max-w-[800px]">
      {[...new Set(matches.map((m) => m.league.id))]
        .sort((a, b) => getOrder(a) - getOrder(b))
        .map((l) => (
          <League matches={matches.filter((m) => m.league.id == l)} key={l} />
        ))}
    </div>
  );
}

function getOrder(id){
  const value=order.order.indexOf(id)
  return value!=-1?value:9999
}