import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Table({
  standing,
  className,
  qualifyArray
}) {

  const [liveMatches, setLiveMatches] = useState([])

  useEffect(() => {
    let date = new Date()
    fetch(`https://v1.basketball.api-sports.io/games?season=2023-2024&timezone=America/Argentina/Buenos_Aires&league=${standing[0].league.id}&date=${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate()}`, {
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN }
    })
      .then((res) => res.json())
      .then((res) => res.response)
      .then((res) => res.filter(m => m.status.timer != null))
      .then((res) => setLiveMatches(res))
  }, [])
  
  return (
    <table
      className={`text-base text-gray-200 text-center border ${className ?? ""}`}
    >
      <thead className="text-center bg-green-800 rounded-t-md">
        {standing[0].group.name}
      </thead>
      <tbody className="bg-gray-500 rounded-b-md p-1">
        {standing.map((s, index) => (
          <Link to={`/team/${s.team.id}`} key={s.team.id}>
            <tr
              className={"flex border first-of-type:border-t-2"} style={{ backgroundColor: `${qualifyArray ? qualifyArray[index] ?? "" : "rgb(22 163 74)"}` }}
            >
              <td>{s.position}°</td>
              <td className="justify flex justify-center">
                <img
                  src={s.team.logo}
                />
                <div className="relative top-7 right-2 min-w-3">
                  {partialResult(liveMatches,s.team.id)=="W"&& <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#37ff00"></path></g></svg>}
                  {partialResult(liveMatches,s.team.id)=="L"&& <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#FF0000"></path></g></svg>}
                  {partialResult(liveMatches,s.team.id)=="T"&& <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#FFFF00"></path></g></svg>}
                  
                </div>
              </td>
              <td className="text-center font-bold">{s.team.name}</td>
              <td className="w-1/12 font-bold">{`${s.games.win.total}-${s.games.lose.total}`}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
}


function partialResult(matches, team_id) {
  console.log(matches)
  let match = matches.filter(m => m.teams.home.id == team_id || m.teams.away.id == team_id)[0]

  if (match) {
    if (match.teams.home.id == team_id && match.scores.home.total > match.scores.away.total || match.teams.away.id == team_id && match.scores.away.total > match.scores.home.total) {
      return "W"
    }
    if (match.teams.home.id == team_id && match.scores.home.total < match.scores.away.total || match.teams.away.id == team_id && match.scores.away.total < match.scores.home.total) {
      return "L"
    }
    return "T"
  }
  return "N"
}