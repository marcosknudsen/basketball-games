import { useEffect } from "react";
import { useLoaderData,useParams,useNavigate,Link } from "react-router-dom";
import { SCROLL_INITIAL_POSITION } from "@/features/constants.js";
import { LOSE_RESULT, NOT_PLAYED_RESULT, WIN_RESULT,SHORT_CODE_FINISHED,SHORT_AFTER_OVERTIME,SHORT_CODE_NOT_STARTED } from "./constant";

export default function TeamMatches() {
  const matches = useLoaderData();
  const { teamId } = useParams()
  const navigate = useNavigate()
  const teamName = matches[0].teams.home.id === parseInt(teamId) ? matches[0].teams.home.name : matches[0].teams.away.name

  useEffect(() => {
    window.scrollTo(SCROLL_INITIAL_POSITION.x, SCROLL_INITIAL_POSITION.y)
  })

  return (
    <>
      <div>
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/")}
        >
          HOME
        </button>
      </div>
      <h1 className="uppercase text-white font-bold text-3xl md:text-2xl text-center">{teamName} Results</h1>
      <div className="w-full flex justify-center">
        <table className="w-1/2 xl:w-5/6 sm:w-11/12 border">
          <thead></thead>
          <tbody>
            {matches.map((m) => {
              let result = NOT_PLAYED_RESULT
              let live = false
              if (m.status.short == SHORT_CODE_FINISHED || m.status.short == SHORT_AFTER_OVERTIME) {
                if (m.teams.home.id === parseInt(teamId)) {
                  result = m.scores.home.total > m.scores.away.total ? WIN_RESULT : LOSE_RESULT
                }
                else {
                  result = m.scores.home.total > m.scores.away.total ? LOSE_RESULT : WIN_RESULT
                }
              }
              else if (m.status.short != SHORT_CODE_NOT_STARTED) {
                live = true
              }

              let fecha = new Date(m.date)
              fecha = fecha.getDate().toString() + "/" + (fecha.getMonth() + 1).toString()

              return (
                <tr key={m.id} className={`flex justify-between p-5 sm:p-1 ${result == WIN_RESULT && "bg-green-600"} ${result == LOSE_RESULT && "bg-red-600"} text-white h-10 border items-center ${result == NOT_PLAYED_RESULT && "bg-gray-600"}`}>
                  <td className={`font-bold w-[10%] sm:text-xs ${live && "text-red-500"}`}>{live ? "Live" : fecha}</td>
                  <td className="w-[10%] flex justify-center">
                    <Link to={"/team/" + m.teams.home.id} className="justify-center items-center flex">
                      <img src={m.teams.home.logo} className="max-h-10"></img>
                    </Link>
                  </td>
                  <td className={`w-[20%] text-center font-bold sm:text-xs sm:leading-none ${live && "text-red-500"}`}>
                    <Link to={"/team/" + m.teams.home.id}>
                      {m.teams.home.name}
                    </Link>
                  </td>
                  <td className={`w-[5%] min-w-6 text-center font-bold sm:text-xs mr-1 text-xl ${live && "text-red-500"}`}>{m.scores.home.total}</td>
                  <td className={`w-[5%] min-w-6 text-center font-bold sm:text-xs ml-1 text-xl ${live && "text-red-500"}`}>{m.scores.away.total}</td>
                  <td className={`w-[20%] text-center font-bold sm:text-xs sm:leading-none ${live && "text-red-500"}`}>
                    <Link to={"/team/" + m.teams.away.id}>
                      {m.teams.away.name}
                    </Link>
                  </td>
                  <td className="w-[10%] flex justify-center">
                    <Link to={"/team/" + m.teams.away.id} className="justify-center items-center flex">
                      <img src={m.teams.away.logo} className="max-h-10"></img>
                    </Link>
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
