import logger from "@/services/logger.js"
import { API_STATS_URL, MATCH_STATS_LOG_API, STATS_ENDPOINT, fixClubs } from "./constants";

export default async function getMatchStats(id) {

  logger(MATCH_STATS_LOG_API, id);
  
  let responseBasketballApi = await fetch(`/api/v1/event/view?token=${import.meta.env.VITE_TOKEN}&event_id=${id}`);
  responseBasketballApi = await responseBasketballApi.json();
  responseBasketballApi = responseBasketballApi.results[0];
  let date = new Date(responseBasketballApi.time*1000);

  let ballDontLieTeam = await fetch(API_STATS_URL+STATS_ENDPOINT, {
    method: "GET",
    headers: { Authorization: import.meta.env.VITE_TOKEN_BALL_DONT_LIE },
  });
  ballDontLieTeam = await ballDontLieTeam.json();
  ballDontLieTeam = ballDontLieTeam.data;

  if (responseBasketballApi.home.name == "Los Angeles Clippers") {
    responseBasketballApi.home.name = "LA Clippers";
  } else if (responseBasketballApi.away.name == "Los Angeles Clippers") {
    responseBasketballApi.away.name = "LA Clippers";
  }

  fixClubs(responseBasketballApi.home);
  fixClubs(responseBasketballApi.away);

  
  let teamids = ballDontLieTeam
  .filter(
    (t) =>
      t.full_name == responseBasketballApi.home.name ||
    t.full_name == responseBasketballApi.away.name
  )
  .map((t) => t.id);

  console.log(teamids)
  
  let ballDontLieGame = await fetch(
    API_STATS_URL+"games?team_ids[]=" +
      teamids[0] +
      "&team_ids[]=" +
      teamids[1] +
      "&start_date=" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      "&end_date=" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0"),
    {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_TOKEN_BALL_DONT_LIE,
      },
    }
  );
  ballDontLieGame = await ballDontLieGame.json();
  ballDontLieGame = ballDontLieGame.data[0];

  let ballDontLieStats = await fetch(
    API_STATS_URL+"stats?game_ids[]=" + ballDontLieGame.id,
    {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_TOKEN_BALL_DONT_LIE,
      },
    }
  );
  ballDontLieStats = await ballDontLieStats.json();

  return {
    stats: ballDontLieStats.data,
    teamsLogos: {
      home: responseBasketballApi.home.image_id,
      away: responseBasketballApi.away.image_id,
    },
  };
}
