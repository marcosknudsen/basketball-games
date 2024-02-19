import ListadoLigas from "../components/Results";

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
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-32 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/yesterday")}
        >
          Yesterday
        </button>
        <button
          className="bg-green-800 p-3 rounded-md text-yellow-400 w-32 uppercase font-semibold hover:bg-green-700 transition-colors"
          onClick={() => navigate("/tomorrow")}
        >
          Tomorrow
        </button>
      </div>
      <ListadoLigas matches={matches} />
    </>
  );
}


