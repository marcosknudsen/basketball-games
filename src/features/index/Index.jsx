import Results from "@components/Results";
import Maintenance from "../maintenance/Maintenance";
import { useLoaderData, useNavigate } from "react-router-dom";
import NoMatches from "../noMatches/NoMatches";
import "../../styles/features/Index.css"; // nuevo archivo de estilos

export default function Index() {
  const matches = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <div className="button-group">
        <button className="nav-button" onClick={() => navigate("/yesterday")}>
          Ayer
        </button>
        <button className="nav-button" onClick={() => navigate("/tomorrow")}>
          Mañana
        </button>
      </div>
      {matches && matches.length ? <Results matches={matches} /> : <NoMatches />}
    </>
  );
}
