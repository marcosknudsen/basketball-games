import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import standingDivisions from "@/settings/standingDivisions.json"
import TablesContainer from "@/components/TablesContainer";
import Table from "@/components/Table";

export default function Standing() {
  const response = useLoaderData();
  const { leagueId } = useParams()
  const navigate = useNavigate();

  let season = response && response.season
  let tables = response && response.tables

  return (
    <>
      {<p className="text-yellow-400 text-3xl font-bold uppercase">{season?.name ?? "La tabla seleccionada aún no está disponible"}</p>}
      <div>
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/")}
        >
          HOME
        </button>
      </div>
      <div className="min-h-[740px] flex gap-[150px] items-center w-full justify-center">
        <TablesContainer>
          {
            tables.map((table) => 
              <Table standing={table} qualifyArray={standingDivisions[leagueId]} leagueId={leagueId} className={`w-1/${tables.length}`} oneTable={tables.length === 1} />
            )
          }
        </TablesContainer>
      </div>
    </>
  );
}
