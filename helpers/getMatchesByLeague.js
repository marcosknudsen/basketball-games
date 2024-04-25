import argentinoJuninLogo from "../src/argentino-junin.png"
import peñarolLogo from "../src/peñarol.png"
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
    if (m.home.id==280){
      m.home.logo=argentinoJuninLogo
    }
    else if (m.away.id==280){
      m.away.logo=argentinoJuninLogo
    }
  })
  response.map((m)=>{
    if (m.home.id==293){
      m.home.logo=peñarolLogo
      m.home.name="Peñarol"
    }
    else if (m.away.id==293){
      m.away.logo=peñarolLogo
      m.away.name="Peñarol"
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
