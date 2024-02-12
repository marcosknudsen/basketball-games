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
  return response.filter((m)=>m.status.short!="POST"&&m.status.short!="ABD");
}
