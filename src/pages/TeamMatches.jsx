import getMatchesByTeam from "../../helpers/getMatchesByTeam";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";

export async function loader({ params }) {
  return await getMatchesByTeam(params.teamId);
}

export default function TeamMatches() {
  const matches = useLoaderData();
  const { teamId } = useParams()
  const teamName=matches[0].teams.home.id===parseInt(teamId)?matches[0].teams.home.name:matches[0].teams.away.name

  return (
    <>
      <h1 className="uppercase text-white font-bold text-3xl">{teamName} Results</h1>
      <div className="w-full flex justify-center">
        <table className="w-1/2 border">
          <thead></thead>
          <tbody>
            {matches.map((m) => {
              let result = "N"
              let live=false
              if (m.status.short == "FT" || m.status.short == "AOT") {
                if (m.teams.home.id === teamId) {
                  result = m.scores.home.total > m.scores.away.total ? "W" : "L"
                }
                else {
                  result = m.scores.home.total > m.scores.away.total ? "L" : "W"
                }
              }
              else if (m.status.short!="NS"){
                live=true
              }

              let fecha=new Date(m.date)
              fecha=fecha.getDate().toString()+"/"+(fecha.getMonth()+1).toString()

              return (
                <tr key={m.id} className={`flex justify-between p-5 ${result == "W" && "bg-green-600"} ${result == "L" && "bg-red-600"} text-white h-10 border items-center ${result == "N" && "bg-gray-600"}`}>
                  <td className={`font-bold ${live&&"text-red-500"}`}>{live?"Live":fecha}</td>
                  <td className="h-10 w-20 flex justify-center"><img src={m.teams.home.logo} className="max-h-10"></img></td>
                  <td className={`w-52 text-center font-bold ${live&&"text-red-500"}`}>{m.teams.home.name}</td>
                  <td className={`w-10 text-center font-bold ${live&&"text-red-500"}`}>{m.scores.home.total}</td>
                  <td className={`w-10 text-center font-bold ${live&&"text-red-500"}`}>{m.scores.away.total}</td>
                  <td className={`w-52 text-center font-bold ${live&&"text-red-500"}`}>{m.teams.away.name}</td>
                  <td className="h-10 w-20 flex justify-center"><img src={m.teams.away.logo} className="max-h-10"></img></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
