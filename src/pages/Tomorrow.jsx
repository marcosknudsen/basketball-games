import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../../helpers/getMatches";

export async function loader() {
  const tomorrow = new Date(Date.now());
  tomorrow.setDate(tomorrow.getDate()+1)
  return await getMatches(tomorrow);
}

export default function Tomorrow() {
  const matches = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase"
        onClick={() => navigate("/")}
      >
        Today
      </button>
      <ListadoLigas matches={matches} />
    </>
  );
}