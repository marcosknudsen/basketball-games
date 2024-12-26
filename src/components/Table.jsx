import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Table({
  standing,
  className,
  qualifyArray,
  leagueId,
  oneTable
}) {

  const [liveMatches, setLiveMatches] = useState([])

  useEffect(() => {
    fetch(`/api/v3/events/inplay?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&league_id=${leagueId}`)
      .then((response) => response.json())
      .then((response) => setLiveMatches(response.results))
  }, [])

  return (
    <div className={className + " flex justify-center max-w-[400px] md:w-full md:mb-10"}>
      <table
        className={`text-base text-gray-200 text-center border w-full`}
      >
        {!oneTable && 
          <thead className="text-center bg-green-800 rounded-t-md">
            {standing.groupname}
          </thead>
        }
        <tbody className="bg-gray-500 rounded-b-md p-1">
          {standing.rows.map((s, index) => (
            <Link to={`/team/${s.team.id}`} key={s.team.id}>
              <tr
                className={"flex border justify-between first-of-type:border-t-2"} style={{ backgroundColor: `${qualifyArray ? qualifyArray[index] ?? "" : "rgb(22 163 74)"}` }}
              >
                <div className="flex w-3/12">
                  <td className="flex justify-center items-center font-bold">{s.pos}°</td>
                  <td className="justify flex justify-center max-w-[200px]">
                    <img
                      src={s.team.logo ?? `https://assets.b365api.com/images/team/b/${s.team.image_id}.png`}
                    />
                    <div className="relative top-7 right-2 min-w-3">
                      {partialResult(liveMatches, s.team.id) == "W" && <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#37ff00"></path></g></svg>}
                      {partialResult(liveMatches, s.team.id) == "L" && <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#FF0000"></path></g></svg>}
                      {partialResult(liveMatches, s.team.id) == "T" && <svg width="12px" height="12px" viewBox="-0.18 -0.18 6.36 6.36" id="meteor-icon-kit__solid-circle-xxxs" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.318"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C1.3431 6 0 4.6569 0 3C0 1.3431 1.3431 0 3 0C4.6569 0 6 1.3431 6 3C6 4.6569 4.6569 6 3 6z" fill="#FFFF00"></path></g></svg>}
                    </div>
                  </td>
                </div>
                <div className="flex justify-between items-center w-9/12">
                  <td className="text-center font-bold w-10/12">{s.team.name}</td>
                  <td className="font-bold w-2/12">{`${s.win}-${s.loss}`}</td>
                </div>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function partialResult(matches, team_id) {
  let match = matches.filter(m => m.home.id == team_id || m.away.id == team_id)[0]

  if (match) {
    if (match.home.id == team_id && match.scores["7"].home > match.scores["7"].away || match.away.id == team_id && match.scores["7"].away > match.scores["7"].home) {
      return "W"
    }
    if (match.home.id == team_id && match.scores["7"].home < match.scores["7"].away || match.away.id == team_id && match.scores["7"].away < match.scores["7"].home) {
      return "L"
    }
    return "T"
  }
  return "N"
}