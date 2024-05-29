import { fixClubs } from "@/services/constants.js";
import logger from "@/services/logger.js";
import { STANDINGS_LOG_STRING } from "./constants";

export default async function getStandings(league) {
  let response = await fetch(
    `/api/v3/league/table?token=${import.meta.env.VITE_TOKEN}&sport_id=18&league_id=${league}`
  );

  response = await response.json();
  let season = response.results && response.results[0]?.season;
  response = response.results && response.results[0].overall.tables;
  logger(STANDINGS_LOG_STRING, league);
  if (!response || !response.length) {
    return null;
  }

  response.map((table) => table.rows.map((pos) => fixClubs(pos.team)));

  if (league == 2274) {
    response[0] = response.filter(
      (table) => table.name == "Western Conference"
    )[0];
    response[1] = response.filter(
      (table) => table.name == "Eastern Conference"
    )[0];
  }

  return { season, tables: response };
}
