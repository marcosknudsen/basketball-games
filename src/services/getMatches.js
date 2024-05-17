import logger from "@/services/logger.js";
import { fixClubs } from "./constants";
import {
  API_BASKETBALL_URL,
  GAMES_ENDPOINT,
  SHORT_CODE_CANCELED,
  SHORT_CODE_POSTPONED,
  MATCHES_LOG_STRING,
} from "./constants";

export default async function getMatches(date) {
  let response = await fetch(
    API_BASKETBALL_URL +
      GAMES_ENDPOINT +
      `?date=${formatDate(date)}&timezone=America/Argentina/Buenos_Aires`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  if (response.length === 0) {
    return [];
  }
  logger(MATCHES_LOG_STRING);
  fixClubs(response);
  response = response.map(function (m) {
    const date = new Date(m.date);
    return {
      id: m.id,
      date:
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0"),
      status: m.status,
      league: m.league,
      country: m.country,
      home: m.teams.home,
      away: m.teams.away,
      scores: m.scores,
      week: m.week,
    };
  });
  response = response
    .filter((m) => m.status.short !== SHORT_CODE_POSTPONED)
    .filter((m) => m.status.short !== SHORT_CODE_CANCELED);

  response.map((m)=>{
    fixClubs(m.home)
    fixClubs(m.away)
  })

  return response;
}

function formatDate(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
}

