import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../../helpers/getMatches";


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
        className="bg-green-800 p-3 rounded-md text-yellow-400 w-20"
        onClick={() => navigate("/")}
      >
        Hoy
      </button>
      <ListadoLigas matches={matches} />;
    </>
  );
}
