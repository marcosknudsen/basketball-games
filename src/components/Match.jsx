import { FaSquarePlus } from "react-icons/fa6";

export default function Match({
  date,
  status,
  timer,
  home_name,
  away_name,
  home_logo,
  away_logo,
  home_score,
  away_score,
}) {
  return (
    <div className="flex items-stretch justify-between mb-1 bg-green-600 md:h-[90px]">
      <div
        className={`w-1/12 justify-center items-center flex text-base font-semibold ${
          (status.short == "NS" && "upcoming") ||
          ((status.short == "FT" || status.short == "AOT") && "finished") ||
          status.short == "CANC" ||
          (status.short == "POST" && "canceled") ||
          "playing"
        }`}
      >
        {(status.short == "NS" && date) ||
          ((status.short == "FT" || status.short == "AOT") && "Finished") ||
          (status.short == "CANC" && "Cancelled") ||
          (status.short == "POST" && "Postponed") ||
          status.short +
            (status.timer && status.timer > 0 ? " " + status.timer + "'" : "")}
      </div>
      <div className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20">
        <div className="max-h-3/5">
          <img
            src={home_logo}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="home-logo"
          />{" "}
        </div>
        <p className="text-base">{home_name}</p>
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {home_score ?? 0}
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl md:text-2xl">
        {away_score ?? 0}
      </div>
      <div className="flex flex-col justify-center items-center w-1/4 team_logo min-w-20">
        <div className="max-h-3/5">
          <img
            src={away_logo}
            className="max-h-20 max-w-32 text-xs md:max-h-10 md:max-w-20"
            alt="away-logo"
          />
        </div>
        <p className="text-base">{away_name}</p>
      </div>
      <div className="flex items-center justify-center mr-2">
        <FaSquarePlus />
      </div>
    </div>
  );
}
