import Match from "./Match";

export default function League({ matches }) {
  return (
    <div className="m-3 text-center text-2xl">
      <div className=" text-yellow-400 rounded-t-md bg-green-800 flex items-center justify-center gap-5">
        {matches[0].country.code != " " && matches[0].country.flag && (
          <img src={matches[0].country.flag ?? "null"} className="w-10" />
        )}
        {matches[0].league.name}
        {matches[0].country.code != " " && matches[0].country.flag && (
          <img src={matches[0].country.flag ?? "null"} className="w-10" />
        )}
      </div>
      <div className="text-white rounded-b-md bg-gray-600">
        {matches.map((m) => (
          <Match
            key={m.id}
            date={m.date}
            status={m.status}
            home_name={m.home.name}
            away_name={m.away.name}
            home_logo={m.home.logo}
            away_logo={m.away.logo}
            home_score={m.scores.home.total}
            away_score={m.scores.away.total}
          />
        ))}
      </div>
    </div>
  );
}
