import argentinoJuninLogo from "@/images/team_logos/argentino-junin.png";
import peñarolLogo from "@/images/team_logos/peñarol.png";
import zarateLogo from "@/images/team_logos/zarate.png";
import independienteOlivaLogo from "@/images/team_logos/independiente-oliva.png";
import riachueloLogo from "@/images/team_logos/riachuelo.png";
import gimnasiaComodoroLogo from "@/images/team_logos/gimnasia-comodoro.png";
import logger from "@/services/logger.js";
import {
  API_BASKETBALL_URL,
  GAMES_ENDPOINT,
  SHORT_CODE_CANCELED,
  SHORT_CODE_POSTPONED,
  MATCHES_LOG_STRING,
} from "./constants";

export default async function getMatches(date) {
  let response = await fetch(
    API_BASKETBALL_URL +
      GAMES_ENDPOINT +
      `?date=${formatDate(date)}&timezone=America/Argentina/Buenos_Aires`,
    {
      method: "GET",
      headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
    }
  );
  response = await response.json();
  response = response.response;
  if (response.length === 0) {
    return [];
  }
  logger(MATCHES_LOG_STRING);
  fixClubs(response);
  response = response.map(function (m) {
    const date = new Date(m.date);
    return {
      id: m.id,
      date:
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0"),
      status: m.status,
      league: m.league,
      country: m.country,
      home: m.teams.home,
      away: m.teams.away,
      scores: m.scores,
      week: m.week,
    };
  });
  response = response
    .filter((m) => m.status.short !== SHORT_CODE_POSTPONED)
    .filter((m) => m.status.short !== SHORT_CODE_CANCELED);
  return response;
}

function formatDate(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
}

function fixClubs(response) {
  response.map((m) => {
    if (m.teams.home.id == 280) {
      m.teams.home.logo = argentinoJuninLogo;
    } else if (m.teams.away.id == 280) {
      m.teams.away.logo = argentinoJuninLogo;
    }
  });
  response.map((m) => {
    if (m.teams.home.id == 293) {
      m.teams.home.logo = peñarolLogo;
      m.teams.home.name = "Peñarol";
    } else if (m.teams.away.id == 293) {
      m.teams.away.logo = peñarolLogo;
      m.teams.away.name = "Peñarol";
    }
  });
  response.map((m) => {
    if (m.teams.home.id == 6125) {
      m.teams.home.logo = zarateLogo;
    } else if (m.teams.away.id == 6125) {
      m.teams.away.logo = zarateLogo;
    }
  });
  response.map((m) => {
    if (m.teams.home.id == 5593) {
      m.teams.home.logo = independienteOlivaLogo;
    } else if (m.teams.away.id == 5593) {
      m.teams.away.logo = independienteOlivaLogo;
    }
  });
  response.map((m) => {
    if (m.teams.home.id == 3114) {
      m.teams.home.logo = riachueloLogo;
    } else if (m.teams.away.id == 3114) {
      m.teams.away.logo = riachueloLogo;
    }
  });
  response.map((m) => {
    if (m.teams.home.id == 286) {
      m.teams.home.logo = gimnasiaComodoroLogo;
      m.teams.home.name = "Gimnasia (CR)";
    } else if (m.teams.away.id == 286) {
      m.teams.away.logo = gimnasiaComodoroLogo;
      m.teams.away.name = "Gimnasia (CR)";
    }
  });
}
