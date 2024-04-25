import argentinoJuninLogo from "../src/argentino-junin.png"
import peñarolLogo from "../src/peñarol.png"
import logger from "./logger.js"

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
  logger("Matches by team",team)
  if (team==293){
    response=response.filter((m)=>m.league.id!=110)
  }
  response.map((m)=>{
    if (m.teams.home.id==280){
      m.teams.home.logo=argentinoJuninLogo
    }
    else if (m.teams.away.id==280){
      m.teams.away.logo=argentinoJuninLogo
    }
  })
  response.map((m)=>{
    if (m.teams.home.id==293){
      m.teams.home.logo=peñarolLogo
      m.teams.home.name="Peñarol"
    }
    else if (m.teams.away.id==293){
      m.teams.away.logo=peñarolLogo
      m.teams.away.name="Peñarol"
    }
  })
  return response.filter((m)=>m.status.short!="POST"&&m.status.short!="ABD");
}
