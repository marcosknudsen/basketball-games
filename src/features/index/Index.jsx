import Results from "@components/Results";
import Maintenance from "../maintenance/Maintenance";
import { useLoaderData, useNavigate } from "react-router-dom";
import NoMatches from "../noMatches/NoMatches";

export default function Index() {
  const matches = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-5">
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-32 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/yesterday")}
        >
          Ayer
        </button>
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-32 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/tomorrow")}
        >
          Mañana
        </button>
      </div>
      {<NoMatches />}
    </>
  );
}


