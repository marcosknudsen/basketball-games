import logger from "@/services/logger.js";
import fixMatches from "../utils/fixMatches";
import fixClubs from "../utils/fixClubs";
import {
  MATCHES_LOG_STRING,SHORT_CODE_CANCELED,SHORT_CODE_REMOVED
} from "./constants";
import leagues from "@/settings/leagues.json";

export default async function getMatches(date) {
  const matchesPromises = leagues.order.map((league) =>
    getMatchesByLeague(league.id, date)
  );

  const results = await Promise.all(matchesPromises);

  let response = results.flat();

  response = [
    ...new Map(response.map((item) => [item.id, item])).values(),
  ];

  logger({action:"Get today matches"});

  response.forEach((m) => {
    fixClubs(m.home);
    fixClubs(m.away);
  });

  response = fixMatches(response);

  return response;
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function dateApiFormat(date) {
  return (
    date.getFullYear() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0")
  );
}

async function getMatchesByLeague(league, date) {
  let response = [];

  let dateTomorrow = new Date(date);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);

  const formattedDate = dateApiFormat(date);
  const formattedDateTomorrow = dateApiFormat(dateTomorrow);

  const urls = [
    `/api/v3/events/inplay?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&league_id=${league}`,
    `/api/v3/events/upcoming?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&day=${formattedDate}&league_id=${league}`,
    `/api/v3/events/upcoming?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&day=${formattedDateTomorrow}&league_id=${league}`,
    `/api/v3/events/ended?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&day=${formattedDate}&league_id=${league}`,
    `/api/v3/events/ended?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&day=${formattedDateTomorrow}&league_id=${league}`,
  ];

  const fetchPromises = urls.map((url) =>
    fetch(url).then((res) => res.json())
  );

  const results = await Promise.all(fetchPromises);

  results.forEach((data) => {
    if (data.results) {
      response.push(...data.results);
    }
  });

  response = response
    .filter(
      (m) =>
        m.time_status !== SHORT_CODE_REMOVED &&
        m.time_status !== SHORT_CODE_CANCELED
    )
    .filter((m) => sameDay(new Date(parseInt(m.time) * 1000), date)) // TODO: usar lógica de zona horaria
    .map((m) => ({
      id: m.id,
      date: m.time,
      status: m.time_status,
      league: m.league,
      home: m.home,
      away: m.away,
      scores: m.ss,
      timer: m.timer,
      round: m.round,
    }));

  return response;
}