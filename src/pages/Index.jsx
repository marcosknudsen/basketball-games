import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../../helpers/getMatches";

export async function loader() {
  const today = new Date(Date.now());
  return await getMatches(today);
}

export default function Index() {
  const matches = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-5">
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-20"
          onClick={() => navigate("/yesterday")}
        >
          Ayer
        </button>
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-20"
          onClick={() => navigate("/tomorrow")}
        >
          Mañana
        </button>
      </div>
      <ListadoLigas matches={matches} />
    </>
  );
}


