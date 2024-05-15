import { useLoaderData, useParams } from "react-router-dom";
import TwoTables from "@/components/TwoTables";
import OneTable from "@/components/OneTable";
import { useNavigate } from "react-router-dom";
import leaguesData from "@/test_data/leaguesData.json"
import standingDivisions from "@/standingDivisions.json"

export default function Standing() {
  const standing = useLoaderData();
  const { leagueId } = useParams()
  const navigate = useNavigate();

  return (
    <>
      {<p className="text-yellow-400 text-3xl font-bold">{leaguesData.data.filter(l => l.id == leagueId)[0].name}</p>}
      {standing.type == "season" ? (
        <>
          <div>
            <button
              className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase font-semibold hover:bg-green-700 transition-colors"
              onClick={() => navigate("/")}
            >
              HOME
            </button>
          </div>
          <div className="min-h-[740px] flex gap-[150px] items-center w-full justify-center">
            {standing.data.length > 1 ? (
              <>
                <TwoTables standing1={standing.data[0]} standing2={standing.data[1]} qualifyArray={standingDivisions[leagueId]} />
              </>
            ) : (
              <OneTable standing={standing.data[0]} qualifyArray={standingDivisions[leagueId]} />
            )}
          </div>
        </>
      ) : <p className="uppercase text-white text-2xl font-bold mb-20">No se ha encontrado la informacion solicitada</p>
      }
    </>
  );
}
