import argentinoJuninLogo from "../src/argentino-junin.png"
import peñarolLogo from "../src/peñarol.png"
import logger from "./logger.js"
import zarateLogo from "../src/zarate.png"
import independienteOlivaLogo from "../src/independiente-oliva.png"
import riachueloLogo from  "../src/riachuelo.png"

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
  response.map((m)=>{
    if (m.teams.home.id==6125){
      m.teams.home.logo=zarateLogo
    }
    else if (m.teams.away.id==6125){
      m.teams.away.logo=zarateLogo
    }
  })
  response.map((m)=>{
    if (m.teams.home.id==5593){
      m.teams.home.logo=independienteOlivaLogo
    }
    else if (m.teams.away.id==5593){
      m.teams.away.logo=independienteOlivaLogo
    }
  })
  response.map((m)=>{
    if (m.teams.home.id==3114){
      m.teams.home.logo=riachueloLogo
    }
    else if (m.teams.away.id==3114){
      m.teams.away.logo=riachueloLogo
    }
  })
  return response.filter((m)=>m.status.short!="POST"&&m.status.short!="ABD");
}
