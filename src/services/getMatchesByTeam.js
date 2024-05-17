import logger from "@/services/logger.js"
import { TEAM_MATCHES_LOG_STRING } from "./constants"
import { fixClubs } from "./constants"

export default async function getMatchesbyTeam(team) {
  let response = await fetch(
    `https://v1.basketball.api-sports.io/games?team=${team}&timezone=America/Argentina/Buenos_Aires&season=2023-2024`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  logger(TEAM_MATCHES_LOG_STRING,team)

  if (team==293){
    response=response.filter((m)=>m.league.id!=110)
  }

  response.map((m)=>{
    fixClubs(m.teams.home)
    fixClubs(m.teams.away)
  })

  return response.filter((m)=>m.status.short!="POST"&&m.status.short!="ABD");
}
