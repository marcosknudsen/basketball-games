import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import standingDivisions from "@/settings/standingDivisions.json";
import TablesContainer from "@/components/TablesContainer";
import Table from "@/components/Table";
import NoMatches from "../noMatches/NoMatches";
import "@/styles/features/standing.css"; // nuevo archivo de estilos

export default function Standing() {
  const response = useLoaderData();
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const season = response?.season;
  const tables = response?.tables;

  return (
    <>
      {season ? (
        <>
          <p className="season-title">
            {season?.name ?? "La tabla seleccionada aún no está disponible"}
          </p>

          <div>
            <button className="home-button" onClick={() => navigate("/")}>
              HOME
            </button>
          </div>

          <div className="tables-wrapper">
            <TablesContainer>
              {tables.map((table) => (
                <Table
                  key={table.id}
                  standing={table}
                  qualifyArray={standingDivisions[leagueId]}
                  leagueId={leagueId}
                  className={`table-width-${tables.length}`}
                  oneTable={tables.length === 1}
                />
              ))}
            </TablesContainer>
          </div>
        </>
      ) : (
        <NoMatches />
      )}
    </>
  );
}
