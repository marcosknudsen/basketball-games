import ListadoLigas from "../components/ListadoLigas";

import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export async function loader() {
  const today = new Date(Date.now());
  let response = await fetch(
    `https://v1.basketball.api-sports.io/games?date=${
      today.getFullYear() +
      "-" +
      padTwoDigits(today.getMonth() + 1) +
      "-" +
      today.getDate()
    }&timezone=America/Argentina/Buenos_Aires`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  response = response.map(function (m) {
    const date = new Date(m.date);
    return {
      id: m.id,
      date:
        padTwoDigits(date.getHours()) + ":" + padTwoDigits(date.getMinutes()),
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
        <button className="bg-green-800 p-3 rounded-md text-yellow-400 w-20" onClick={()=>navigate("/yesterday")}>Ayer</button>
        <button className="bg-green-800 p-3 rounded-md text-yellow-400 w-20" onClick={()=>navigate("/tomorrow")}>Mañana</button>
      </div>
      <ListadoLigas matches={matches} />;
    </>
  );
}

function padTwoDigits(n) {
  return n.toString().padStart(2, "0");
}
