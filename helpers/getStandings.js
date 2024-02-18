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
  if (!response.length) {
    return null;
  }
  response = response[0];
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
