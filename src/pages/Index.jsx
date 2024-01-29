import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../../helpers/getMatches";

export async function loader() {
  const today = new Date(Date.now());
  let response = await getMatches(today);
  response = await response.json();
  response = response.response;
  response = response.map(function (m) {
    const date = new Date(m.date);
    return {
      id: m.id,
      date:
        date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0"),
      status: m.status,
      league: m.league,
      country: m.country,
      home: m.teams.home,
      away: m.teams.away,
      scores: m.scores,
    };
  });
  return response;
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


