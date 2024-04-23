import argentinoJuninLogo from "../src/argentino-junin.png"

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
  response.map((m)=>{
    if (m.home.id==280){
      m.home.logo=argentinoJuninLogo
    }
    else if (m.away.id==280){
      m.away.logo=argentinoJuninLogo
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
