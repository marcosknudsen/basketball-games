import logger from "@/services/logger.js"
import { TEAM_MATCHES_LOG_STRING,TEAM_ID_PEÑAROL,LEAGUE_ID_URY, SHORT_CODE_POSTPONED,SHORT_CODE_ABD } from "./constants"
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

  if (team==TEAM_ID_PEÑAROL){
    response=response.filter((m)=>m.league.id!=LEAGUE_ID_URY)
  }

  response.map((m)=>{
    fixClubs(m.teams.home)
    fixClubs(m.teams.away)
  })

  return response.filter((m)=>m.status.short!=SHORT_CODE_POSTPONED&&m.status.short!=SHORT_CODE_ABD);
}
