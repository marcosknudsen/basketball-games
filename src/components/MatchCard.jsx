import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
}) {
  return (
    <div className="flex items-stretch justify-between mb-1 bg-green-600 md:h-[90px] desktop:h-28">
      <div
        className={`w-1/12 justify-center items-center flex text-base font-semibold ${(status.short == "NS" && "upcoming") ||
          ((status.short == "FT" || status.short == "AOT") && "finished") ||
          "playing"
          }`}
      >
        {(status.short == "NS" && date) ||
          ((status.short == "FT" || status.short == "AOT") && "Finished") ||
          (status.short == "CANC" && "Canceled") ||
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
        <p className="text-base">{home_name}</p>
      </Link>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status.short == "NS"
          ? "-"
          : home_score}
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {status.short == "NS"
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
        <p className="text-base">{away_name}</p>
      </Link>
      {league_id == 12 && <div className="flex justify-center items-center w-14">
        <Link to={`/game/${id}`}>
          <FaSquarePlus className="text-2xl" />
        </Link>
      </div>}
    </div>
  );
}
