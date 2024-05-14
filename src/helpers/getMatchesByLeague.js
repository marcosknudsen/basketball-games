import argentinoJuninLogo from "../images/team_logos/argentino-junin.png"
import peñarolLogo from "../images/team_logos/peñarol.png"
import zarateLogo from "../images/team_logos/zarate.png"
import independienteOlivaLogo from "../images/team_logos/independiente-oliva.png"
import riachueloLogo from  "../images/team_logos/riachuelo.png"
import gimnasiaComodoroLogo from "../images/team_logos/gimnasia-comodoro.png"
import logger from "./logger.js"

export default async function (league) {
  let response = await fetch(
    `https://v1.basketball.api-sports.io/games?timezone=America/Argentina/Buenos_Aires&league=${league}&season=2024`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  logger("Matches by league",league)
  response.map((m)=>{
    if (m.home?.id==280){
      m.home.logo=argentinoJuninLogo
    }
    else if (m.away?.id==280){
      m.away.logo=argentinoJuninLogo
    }
  })
  response.map((m)=>{
    if (m.home?.id==293){
      m.home.logo=peñarolLogo
      m.home.name="Peñarol"
    }
    else if (m.away?.id==293){
      m.away.logo=peñarolLogo
      m.away.name="Peñarol"
    }
  })
  response.map((m)=>{
    if (m.home?.id==6125){
      m.home.logo=zarateLogo
    }
    else if (m.away?.id==6125){
      m.away.logo=zarateLogo
    }
  })
  response.map((m)=>{
    if (m.home?.id==5593){
      m.home.logo=independienteOlivaLogo
    }
    else if (m.away?.id==5593){
      m.away.logo=independienteOlivaLogo
    }
  })
  response.map((m)=>{
    if (m.home?.id==3114){
      m.home.logo=riachueloLogo
    }
    else if (m.away?.id==3114){
      m.away.logo=riachueloLogo
    }
  })
  response.map((m)=>{
    if (m.home?.id==286){
      m.home.logo=gimnasiaComodoroLogo
      m.home.name="Gimnasia (CR)"
    }
    else if (m.away?.id==286){
      m.away.logo=gimnasiaComodoroLogo
      m.away.name="Gimnasia (CR)"
    }
  })
  if (!response) {
    await fetch(
      `https://v1.basketball.api-sports.io/games?timezone=America/Argentina/Buenos_Aires&league=${league}&season=2023-2024`,
      {
        method: "GET",
        headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
      }
    );
    response = await response.json();
    response = response.response;
  }
  return {
    type: "playoff",
    data: response,
  };
}
