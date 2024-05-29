import League from "@components/League";
import order from "@/order.json";

export default function Results({ matches }) {
  return (
    <div className="w-3/4 max-w-[800px] lg:w-full">
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