import ListadoLigas from "../components/Results";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../helpers/getMatches";


export async function loader() {
  const yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate()-1)
  return await getMatches(yesterday);
}

export default function Yesterday() {
  const matches = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase font-semibold hover:bg-green-700 transition-colors"
        onClick={() => navigate("/")}
      >
        Hoy
      </button>
      <ListadoLigas matches={matches} />
    </>
  );
}
