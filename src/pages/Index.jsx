import ListadoLigas from "../components/ListadoLigas";

import data from "../../matches.json";
import { useLoaderData } from "react-router-dom";

export async function loader() {
    let response = await fetch(
    `https://v1.basketball.api-sports.io/games?date=2024-01-24&timezone=America/Argentina/Buenos_Aires`,
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
      flag: m.country.flag,
      home: m.teams.home,
      away: m.teams.away,
      scores: m.scores,
    };
  });
  return response;
}

export default function Index() {
  const matches = useLoaderData();
  return <ListadoLigas matches={matches} />;
}

function padTwoDigits(n) {
  return n.toString().padStart(2, "0");
}
