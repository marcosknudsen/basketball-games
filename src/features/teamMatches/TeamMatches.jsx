import { useEffect } from "react";
import { useLoaderData,useParams,useNavigate,Link } from "react-router-dom";
import { SCROLL_INITIAL_POSITION } from "@/features/constants.js";
import { LOSE_RESULT, NOT_PLAYED_RESULT, WIN_RESULT,SHORT_CODE_FINISHED,SHORT_AFTER_OVERTIME,SHORT_CODE_NOT_STARTED } from "./constant";

export default function TeamMatches() {
  const matches = useLoaderData();
  const { teamId } = useParams()
  const navigate = useNavigate()
  const teamName = matches[0].home.id === teamId ? matches[0].home.name : matches[0].away.name

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
              if (m.time_status == 3) {
                if (m.home.id === teamId) {
                  result = parseInt(m.scores["7"]?.home) > parseInt(m.scores["7"]?.away) ? WIN_RESULT : LOSE_RESULT
                }
                else {
                  result = parseInt(m.scores["7"]?.home) > parseInt(m.scores["7"]?.away) ? LOSE_RESULT : WIN_RESULT
                }
              }
              else if (m.time_status != 0) {
                live = true
              }

              let fecha = new Date(parseInt(m.time)*1000)
              fecha = fecha.getDate().toString() + "/" + (fecha.getMonth() + 1).toString()

              return (
                <tr key={m.id} className={`flex justify-between p-5 sm:p-1 ${result == WIN_RESULT && "bg-green-600"} ${result == LOSE_RESULT && "bg-red-600"} text-white h-10 border items-center ${result == NOT_PLAYED_RESULT && "bg-gray-600"}`}>
                  <td className={`font-bold w-[10%] sm:text-xs ${live && "text-red-500"}`}>{live ? "Live" : fecha}</td>
                  <td className="w-[10%] flex justify-center">
                    <Link to={"/team/" + m.home.id} className="justify-center items-center flex">
                      <img src={m.home.logo??`https://assets.b365api.com/images/team/b/${m.home.image_id}.png`} className="max-h-10"></img>
                    </Link>
                  </td>
                  <td className={`w-[20%] text-center font-bold sm:text-xs sm:leading-none ${live && "text-red-500"}`}>
                    <Link to={"/team/" + m.home.id}>
                      {m.home.name}
                    </Link>
                  </td>
                  <td className={`w-[5%] min-w-6 text-center font-bold sm:text-xs mr-1 text-xl ${live && "text-red-500"}`}>{m.scores&& m.scores["7"]?.home}</td>
                  <td className={`w-[5%] min-w-6 text-center font-bold sm:text-xs ml-1 text-xl ${live && "text-red-500"}`}>{m.scores&& m.scores["7"]?.away}</td>
                  <td className={`w-[20%] text-center font-bold sm:text-xs sm:leading-none ${live && "text-red-500"}`}>
                    <Link to={"/team/" + m.away.id}>
                      {m.away.name}
                    </Link>
                  </td>
                  <td className="w-[10%] flex justify-center">
                    <Link to={"/team/" + m.away.id} className="justify-center items-center flex">
                      <img src={m.away.logo??`https://assets.b365api.com/images/team/b/${m.away.image_id}.png`} className="max-h-10"></img>
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
