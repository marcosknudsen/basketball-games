import argentinoJuninLogo from "../src/argentino-junin.png"
import peñarolLogo from "../src/peñarol.png"
import zarateLogo from "../src/zarate.png"
import independienteOlivaLogo from "../src/independiente-oliva.png"
import logger from "./logger.js"
import riachueloLogo from  "../src/riachuelo.png"
import gimnasiaComodoroLogo from "../src/gimnasia-comodoro.png"

export default async function getStandings(league) {
  let response = await fetch(
    `https://v1.basketball.api-sports.io/standings?league=${league}&season=2023-2024`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  logger("Standings",[league])
  if (!response.length) {
    return null;
  }
  response = response[0];
  response.map((pos)=>{
    if (pos.team.id==280){
      pos.team.logo=argentinoJuninLogo
    }
  })
  response.map((pos)=>{
    if (pos.team.id==293){
      pos.team.logo=peñarolLogo
      pos.team.name="Peñarol"
    }
  })
  response.map((pos)=>{
    if (pos.team.id==6125){
      pos.team.logo=zarateLogo
    }
  })
  response.map((pos)=>{
    if (pos.team.id==5593){
      pos.team.logo=independienteOlivaLogo
    }
  })
  response.map((pos)=>{
    if (pos.team.id==3114){
      pos.team.logo=riachueloLogo
    }
  })
  response.map((pos)=>{
    if (pos.team.id==286){
      pos.team.logo=gimnasiaComodoroLogo
      pos.team.name="Gimnasia (CR)"
    }
  })
  if (response[0].league.id == 12) {
    return {
      type: "season",
      data: [
        response.filter((s) => s.group.name == "Western Conference"),
        response.filter((s) => s.group.name == "Eastern Conference"),
      ],
    };
  }
  return {
    type: "season",
    data: [response],
  };
}
