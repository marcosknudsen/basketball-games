import { useLoaderData, useNavigate } from "react-router-dom";
import ListadoLigas from "@components/Results";
import Maintenance from "../maintenance/Maintenance";
import NoMatches from "../noMatches/NoMatches";
import "../../styles/features/yesterday.css";

export default function Yesterday() {
  const matches = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <button className="volver-button" onClick={() => navigate("/")}>
        Hoy
      </button>
      {matches && matches.length ? (
        <ListadoLigas matches={matches} />
      ) : (
        <NoMatches />
      )}
    </>
  );
}
