import logger from "@/services/logger.js";
import fixMatches from "./fixMatches";
import fixClubs from "./fixClubs";
import {
  MATCHES_LOG_STRING
} from "./constants";

export default async function getMatches(date) {
  //TODO fix complete logos load

  let response = [];
  let responseInPlay;
  let responseEnded;
  let responseUpcoming;
  let responseEndedTomorrow;
  let responseUpcomingTomorrow;

  responseInPlay = await fetch(
    `/api/v3/events/inplay?token=${
      import.meta.env.VITE_TOKEN
    }&sport_id=18&skip_esports=true&per_page=100`
  );
  responseInPlay = await responseInPlay.json();
  responseInPlay = await responseInPlay.results;
  responseInPlay.map((m) => response.push(m));

  responseUpcoming = await fetch(
    `/api/v3/events/upcoming?token=${
      import.meta.env.VITE_TOKEN
    }&sport_id=18&skip_esports=true&day=${dateApiFormat(date)}&per_page=100`
  );
  responseUpcoming = await responseUpcoming.json();
  responseUpcoming = await responseUpcoming.results;
  responseUpcoming.map((m) => response.push(m));

  let dateTomorrow = new Date(date);
  let dateYesterday = new Date(date);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  dateYesterday.setDate(dateYesterday.getDate() - 1);

  responseUpcomingTomorrow = await fetch(
    `/api/v3/events/upcoming?token=${
      import.meta.env.VITE_TOKEN
    }&sport_id=18&skip_esports=true&day=${dateApiFormat(
      dateTomorrow
    )}&per_page=100`
  );
  responseUpcomingTomorrow = await responseUpcomingTomorrow.json();
  responseUpcomingTomorrow = await responseUpcomingTomorrow.results;
  responseUpcomingTomorrow.map((m) => response.push(m));

  responseEnded = await fetch(
    `/api/v3/events/ended?token=${
      import.meta.env.VITE_TOKEN
    }&sport_id=18&skip_esports=true&day=${dateApiFormat(date)}&per_page=100`
  );
  responseEnded = await responseEnded.json();
  responseEnded = await responseEnded.results;
  responseEnded.map((m) => response.push(m));

  responseEndedTomorrow = await fetch(
    `/api/v3/events/ended?token=${
      import.meta.env.VITE_TOKEN
    }&sport_id=18&skip_esports=true&day=${dateApiFormat(dateTomorrow)}&per_page=100`
  );
  responseEndedTomorrow = await responseEndedTomorrow.json();
  responseEndedTomorrow = await responseEndedTomorrow.results;
  responseEndedTomorrow.map((m) => response.push(m));

  response = response.filter((m) => m.time_status != 99);
  response = response.filter((m) =>
    sameDay(new Date(parseInt(m.time) * 1000), date)
  ); //TODO use timezone logic

  response = response.map(function (m) {
    return {
      id: m.id,
      date: m.time,
      status: m.time_status,
      league: m.league,
      home: m.home,
      away: m.away,
      scores: m.ss,
      timer: m.timer,
      round: m.round,
    };
  });
  
  response = [...new Set(response.map((m)=>m.date+m.league+m.home.id+m.away.id))];
  logger(MATCHES_LOG_STRING);

  response.map((m) => {
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
