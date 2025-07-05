import fixClubs from "../utils/fixClubs";
import logger from "@/services/logger.js";
import { STANDINGS_LOG_STRING } from "./constants";
import fixLeaguesStanding from "../utils/fixLeaguesStanding";

export default async function getStandings(league) {
  let response = await fetch(
    `/api/v3/league/table?token=${import.meta.env.VITE_TOKEN}&sport_id=18&league_id=${league}`
  );

  response = await response.json();
  response = response.results
  if (!response)
    return { season: null, tables: [] };
  let season = getSeason(response)
  let tables = season.overall.tables
  logger(STANDINGS_LOG_STRING, league);
  if (!response || !response.length) {
    return null;
  }

  let tablesNames = fixLeaguesStanding(league);

  if (tablesNames.length) {
    tables = tables.filter(t => tablesNames.includes(t.name));
  }

  tables.map((table) => table.rows.map((pos) => fixClubs(pos.team)));

  return { season: season.season, tables };
}

function getSeason(seasons) {
    return seasons.reduce((latest, current) => {
        return Number(current.season.start_time) > Number(latest.season.start_time) ? current : latest;
    }, seasons[0]);
}
