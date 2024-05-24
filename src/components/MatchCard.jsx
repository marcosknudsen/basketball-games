import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { SHORT_CODE_AFTER_OVERTIME, SHORT_CODE_CANCELED, SHORT_CODE_FINISHED, SHORT_CODE_NOT_STARTED, LEAGUE_ID_NBA, LEAGUE_ID_ARG } from "./constants";

export default function MatchCard({
  date,
  id,
  league_id,
  status,
  home_name,
  away_name,
  home_logo,
  away_logo,
  home_score,
  away_score,
  home_team_id,
  away_team_id,
  week
}) {

  const [home_streak, setHomeStreak] = useState(null)
  const [away_streak, setAwayStreak] = useState(null)

  useEffect(() => {
    async function fetchMatch() {
      if ((league_id == LEAGUE_ID_NBA || league_id == LEAGUE_ID_ARG) && week) {
        let matches = await fetch(`https://v1.basketball.api-sports.io/games?h2h=${home_team_id}-${away_team_id}&season=2023-2024`, {
          headers: { "x-apisports-key": import.meta.env.VITE_TOKEN }
        })
        matches = await matches.json()
        matches = matches.response.filter(m => m.week == week && (m.status.short == SHORT_CODE_FINISHED || m.status.short == SHORT_CODE_AFTER_OVERTIME))
        setHomeStreak(matches.filter(m => (home_team_id == m.teams.home.id && m.scores.home.total > m.scores.away.total) || (home_team_id == m.teams.away.id && m.scores.away.total > m.scores.home.total)).length)
        setAwayStreak(matches.filter(m => (away_team_id == m.teams.home.id && m.scores.home.total > m.scores.away.total) || (away_team_id == m.teams.away.id && m.scores.away.total > m.scores.home.total)).length) 
      }
    }
    fetchMatch()
  }, [])

  return (
    <div className="flex items-stretch justify-between mb-1 bg-green-600 md:h-[90px] desktop:h-28">
      <div
        className={`w-1/12 justify-center items-center flex text-base font-semibold ${(status.short == SHORT_CODE_NOT_STARTED && "upcoming") ||
          ((status.short == SHORT_CODE_FINISHED || status.short == SHORT_CODE_AFTER_OVERTIME) && "finished") ||
          "playing"
          }`}
      >
        {(status.short == SHORT_CODE_NOT_STARTED && date) ||
          ((status.short == SHORT_CODE_FINISHED || status.short == SHORT_CODE_AFTER_OVERTIME) && "Finished") ||
          (status.short == SHORT_CODE_CANCELED && "Canceled") ||
          status.short +
          (status.timer && status.timer > 0 ? " " + status.timer + "'" : "")}
      </div>
      <Link
        to={`/team/${home_team_id}`}
        className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20 hover:bg-green-700 transition-colors hover:rounded-xl hover:my-1"
      >
        <div className="max-h-3/5">
          <img
            src={home_logo}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="home-logo"
          />
        </div>
        <p className="text-[15px]">{home_name} {window.innerWidth <= 767 && <br />} {home_streak!=null && <span className="text-lg font-semibold md:text-sm">{week != null && league_id == LEAGUE_ID_NBA ? ` (${home_streak})` : ""}</span>}</p>
      </Link>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status.short == SHORT_CODE_NOT_STARTED
          ? "-"
          : home_score}
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status.short == SHORT_CODE_NOT_STARTED
          ? "-"
          : away_score}
      </div>
      <Link to={`/team/${away_team_id}`} className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20 hover:bg-green-700 transition-colors hover:rounded-xl hover:my-1">
        <div className="max-h-3/5">
          <img
            src={away_logo}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="away-logo"
          />
        </div>
        <p className="text-[15px]">{away_name} {window.innerWidth <= 767 && <br />} {away_streak!=null && <span className="text-lg font-semibold md:text-sm">{week != null && league_id == LEAGUE_ID_NBA ? ` (${away_streak})` : ""}</span>}</p>
      </Link>
      {(league_id == LEAGUE_ID_NBA && (status.short != SHORT_CODE_NOT_STARTED)) && <div className="flex justify-center items-center w-14">
        <Link to={`/game/${id}`}>
          <FaSquarePlus className="text-2xl" />
        </Link>
      </div>}
    </div>
  );
}
