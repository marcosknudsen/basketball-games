import logger from "@/services/logger.js";
import fixMatches from "../utils/fixMatches";
import {
  TEAM_MATCHES_LOG_STRING,
} from "./constants";
import fixClubs from "../utils/fixClubs";

export default async function getMatchesbyTeam(team) {
  let response = [];

  logger(TEAM_MATCHES_LOG_STRING, team)

  let responseInPlay = await fetch(
    `/api/v3/events/inplay?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&team_id=${team}`
  );
  responseInPlay = await responseInPlay.json();
  responseInPlay = await responseInPlay.results;
  responseInPlay.map((m) => response.push(m));

  let responseUpcoming = await fetch(
    `/api/v3/events/upcoming?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&team_id=${team}`
  );
  responseUpcoming = await responseUpcoming.json();
  responseUpcoming = await responseUpcoming.results;
  responseUpcoming = responseUpcoming.filter((m) => m.round >= responseUpcoming[0].round);
  responseUpcoming.map((m) => response.push(m));


  let responseFinished = await fetch(
    `/api/v3/events/ended?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&team_id=${team}`
  );
  responseFinished = await responseFinished.json();
  responseFinished = await responseFinished.results;
  responseFinished.map((m) => response.push(m));

  response = [...new Set([...response])];
  response = response.sort((a, b) => a.time - b.time);
  response = fixMatches(response)

  response.map((m) => {
    fixClubs(m.home);
    fixClubs(m.away);
  });

  response = response.filter(m => m.scores?.["7"] || m.time_status == 0)

  return response.filter(
    (m) => !["2", "4", "5", "99", "10", "11"].includes(m.time_status)
  );
}
