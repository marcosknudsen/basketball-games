export default async function (league) {
  let response = await fetch(
    `https://v1.basketball.api-sports.io/games?timezone=America/Argentina/Buenos_Aires&league=${league}&season=2023-2024`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  let a={
    "type": "playoff",
    "data": response,
  }
  return a;
}
