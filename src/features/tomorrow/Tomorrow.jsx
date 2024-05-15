import ListadoLigas from "../../components/Results";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Tomorrow() {
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