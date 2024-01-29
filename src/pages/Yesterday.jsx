import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getMatches from "../../helpers/getMatches";


export async function loader() {
  const yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate()-1)
  let response = await getMatches(yesterday);
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
