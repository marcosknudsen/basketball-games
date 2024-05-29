import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { SHORT_CODE_FINISHED, SHORT_CODE_NOT_STARTED, LEAGUE_ID_NBA, LEAGUE_ID_ARG_1, PLAYOFF_START_ARG_1, PLAYOFF_START_NBA, LEAGUE_ID_ARG_2, PLAYOFF_START_ARG_2 } from "./constants";

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
  home_image_id,
  away_image_id,
  home_team_id,
  away_team_id,
  timer,
  round
}) {

  const [home_streak, setHomeStreak] = useState(null)
  const [away_streak, setAwayStreak] = useState(null)

  let matchDate = new Date(date * 1000)

  useEffect(() => {
    async function fetchMatch() {
      if (league_id == LEAGUE_ID_NBA || league_id == LEAGUE_ID_ARG_1 || league_id == LEAGUE_ID_ARG_2) {
        let matches = await fetch(`/api/v3/events/ended?token=${import.meta.env.VITE_TOKEN}&sport_id=18&skip_esports=true&team_id=${home_team_id}`)
        matches = await matches.json()
        matches = matches.results
        matches = matches.filter((m) => m.away.id == away_team_id || m.home.id == away_team_id)
        if (league_id == LEAGUE_ID_NBA) {
          matches = matches.filter(m => new Date(m.time * 1000) > new Date(PLAYOFF_START_NBA) && m.time_status == SHORT_CODE_FINISHED)
        }
        if (league_id == LEAGUE_ID_ARG_1) {
          matches = matches.filter((m) => new Date(m.time * 1000) > new Date(PLAYOFF_START_ARG_1) && m.time_status == SHORT_CODE_FINISHED)
        }
        if (league_id == LEAGUE_ID_ARG_2) {
          matches = matches.filter((m) => new Date(m.time * 1000) > new Date(PLAYOFF_START_ARG_2) && m.time_status == SHORT_CODE_FINISHED)
        }

        setHomeStreak(matches.filter(m => (home_team_id == m.home.id && m.scores["7"].home > m.scores["7"].away) || (home_team_id == m.away.id && m.scores["7"].away > m.scores["7"].home)).length)
        setAwayStreak(matches.filter(m => (away_team_id == m.home.id && m.scores["7"].home > m.scores["7"].away) || (away_team_id == m.away.id && m.scores["7"].away > m.scores["7"].home)).length)
      }
    }
    fetchMatch()
  }, [])

  return (
    <div className="flex items-stretch justify-between mb-1 bg-green-600 md:h-[90px] desktop:h-28">
      <div
        className={`w-1/12 justify-center items-center flex text-base font-semibold ${(status.short == SHORT_CODE_NOT_STARTED && "upcoming") ||
          ((status == SHORT_CODE_FINISHED || status == 2) && "finished") ||
          ((status == SHORT_CODE_NOT_STARTED) && "upcoming") ||
          "playing"
          }`}
      >
        {status == 1 && `Q${timer.q} ${timer.tm}:${timer.ts.toString().padStart(2, "0")}`}
        {status == 0 && formatDate(matchDate)}
        {(status == 3 || status == 2 || status == 4 || status == 5) && "Finished"}
      </div>
      <Link
        to={`/team/${home_team_id}`}
        className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20 hover:bg-green-700 transition-colors hover:rounded-xl hover:my-1"
      >
        <div className="max-h-3/5">
          <img
            src={home_logo ?? `https://assets.b365api.com/images/team/b/${home_image_id}.png`}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="home-logo"
          />
        </div>
        <p className="text-[15px]">{home_name} {window.innerWidth <= 767 && <br />} {home_streak != null && <span className="text-lg font-semibold md:text-sm">{`(${home_streak})`}</span>}</p>
      </Link>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status == SHORT_CODE_NOT_STARTED
          ? "-"
          : home_score}
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status == SHORT_CODE_NOT_STARTED
          ? "-"
          : away_score}
      </div>
      <Link to={`/team/${away_team_id}`} className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20 hover:bg-green-700 transition-colors hover:rounded-xl hover:my-1">
        <div className="max-h-3/5">
          <img
            src={away_logo ?? `https://assets.b365api.com/images/team/b/${away_image_id}.png`}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="away-logo"
          />
        </div>
        <p className="text-[15px]">{away_name} {window.innerWidth <= 767 && <br />} {away_streak != null && <span className="text-lg font-semibold md:text-sm">{`(${away_streak})`}</span>}</p>
      </Link>
      {(league_id == LEAGUE_ID_NBA && (status != SHORT_CODE_NOT_STARTED)) && <div className="flex justify-center items-center w-14">
        <Link to={`/game/${id}`}>
          <FaSquarePlus className="text-2xl" />
        </Link>
      </div>}
    </div>
  );
}


function formatDate(date) {
  return (
    date.getHours().toString().padStart(2, "0") + ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}

