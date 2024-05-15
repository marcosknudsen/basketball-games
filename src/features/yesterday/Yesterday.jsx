import { useLoaderData,useNavigate } from "react-router-dom";
import ListadoLigas from "@components/Results";


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
