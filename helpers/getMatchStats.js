import TeamStats from "../src/components/TeamStats";
import logger from "./logger.js"

export default async function getMatchStats(id) {

  logger("Match stats", id);
  
  let responseBasketballApi = await fetch(
    "https://v1.basketball.api-sports.io/games?id=" + id,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  responseBasketballApi = await responseBasketballApi.json();
  responseBasketballApi = responseBasketballApi.response[0];
  let date = new Date(responseBasketballApi.date);

  let ballDontLieTeam = await fetch("https://api.balldontlie.io/v1/teams", {
    method: "GET",
    headers: { Authorization: import.meta.env.VITE_TOKEN_BALL_DONT_LIE },
  });
  ballDontLieTeam = await ballDontLieTeam.json();
  ballDontLieTeam = ballDontLieTeam.data;

  if (responseBasketballApi.teams.home.name == "Los Angeles Clippers") {
    responseBasketballApi.teams.home.name = "LA Clippers";
  } else if (responseBasketballApi.teams.away.name == "Los Angeles Clippers") {
    responseBasketballApi.teams.away.name = "LA Clippers";
  }

  let teamids = ballDontLieTeam
    .filter(
      (t) =>
        t.full_name == responseBasketballApi.teams.home.name ||
        t.full_name == responseBasketballApi.teams.away.name
    )
    .map((t) => t.id);

  let ballDontLieGame = await fetch(
    "https://api.balldontlie.io/v1/games?team_ids[]=" +
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
    "https://api.balldontlie.io/v1/stats?game_ids[]=" + ballDontLieGame.id,
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
      home: responseBasketballApi.teams.home.logo,
      away: responseBasketballApi.teams.away.logo,
    },
  };
}
