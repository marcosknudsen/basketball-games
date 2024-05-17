import { fixClubs } from "@/services/constants.js";
import logger from "@/services/logger.js";
import { API_BASKETBALL_URL, STANDINGS_LOG_STRING } from "./constants";

export default async function getStandings(league) {
  let response = await fetch(
    API_BASKETBALL_URL + `standings?league=${league}&season=2023-2024`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );

  response = await response.json();
  response = response.response;
  logger(STANDINGS_LOG_STRING, league);
  if (!response.length) {
    return null;
  }
  response = response[0];
  response.map((pos) => fixClubs(pos.team));

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
