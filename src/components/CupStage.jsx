import Match from "./Match"
export default function Week({ matches }) {
    return (<>
        <div className="font-bold text-yellow-400 rounded-t-md bg-green-800 flex items-center justify-center gap-5">
            {matches[0].week?.replaceAll(`${matches[0].league.name} - `,"")}
        </div>
        <div className="mb-3 text-center text-2xl text-white rounded-b-md bg-gray-600">
            {matches.map(m => <Match
                key={m.id}
                date={m.date}
                status={m.status}
                home_name={m.teams.home.name}
                away_name={m.teams.away.name}
                home_logo={m.teams.home.logo}
                away_logo={m.teams.away.logo}
                home_score={m.scores.home.total}
                away_score={m.scores.away.total}
                home_team_id={m.teams.home.id}
                away_team_id={m.teams.away.id}
            />)}
        </div>
    </>
    )
}
