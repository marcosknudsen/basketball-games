import argentinoJuninLogo from "@/images/team_logos/argentino-junin.png";
import peñarolLogo from "@/images/team_logos/peñarol.png";
import zarateLogo from "@/images/team_logos/zarate.png";
import independienteOlivaLogo from "@/images/team_logos/independiente-oliva.png";
import riachueloLogo from "@/images/team_logos/riachuelo.png";
import gimnasiaComodoroLogo from "@/images/team_logos/gimnasia-comodoro.png";


export const SHORT_CODE_POSTPONED = "POST";
export const SHORT_CODE_CANCELED = "CANC";
export const API_BASKETBALL_URL = "https://v1.basketball.api-sports.io/";
export const API_STATS_URL = "https://api.balldontlie.io/v1/";
export const GAMES_ENDPOINT = "games";
export const MATCHES_LOG_STRING = "Matches by date";
export const TEAM_MATCHES_LOG_STRING = "Matches by team";
export const STATS_ENDPOINT = "teams";
export const MATCH_STATS_LOG_API = "Match stats";
export const STANDINGS_LOG_STRING = "Standings";

export function fixClubs(team) {
  switch (team.id) {
    case 280:
      team.logo = argentinoJuninLogo;
      break;
    case 293:
      team.logo = peñarolLogo;
      team.name = "Peñarol";
      break;
    case 6125:
      team.logo = zarateLogo;
      break;
    case 5593:
      team.logo = independienteOlivaLogo;
      break;
    case 3114:
      team.logo = riachueloLogo;
      break;
    case 286:
      team.logo = gimnasiaComodoroLogo;
      team.name = "Gimnasia (CR)";
      break;
    default:
      break;
  }
}
