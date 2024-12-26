import League from "@components/League";
import leagues from "@/settings/leagues.json";

export default function Results({ matches }) {
  console.log(matches)
  return (
    <div className="w-3/4 max-w-[800px] lg:w-full">
      {[...new Set(matches.map((m) => m.league.id))]
        .sort((a, b) => getOrder(a) - getOrder(b))
        .map((l) => (
          <League matches={matches.filter((m) => m.league.id == l).sort((a, b) => a.date - b.date)} key={l} />
        ))}
    </div>
  );
}

function getOrder(id) {
  const value = leagues.order.indexOf(parseInt(id))
  return value != -1 ? value : 9999
}