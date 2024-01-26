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
    <div className="flex items-stretch justify-between mb-1 bg-green-600 h-32">
      <div
        className={` w-1/12 justify-center items-center flex text-base font-semibold ${
          (status.short == "NS" && "upcoming") ||
          ((status.short == "FT" || status.short == "AOT") && "finished") ||
          (status.short == "CANC" && "canceled") ||
          "playing"
        }`}
      >
        {(status.short == "NS" && date) ||
          ((status.short == "FT" || status.short == "AOT") && "Finished") ||
          (status.short == "CANC" && "Cancelled") ||
          status.short + ((status.timer && status.timer>0) ? " " + status.timer + "'" : "")}
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        <div className="max-h-3/5">
          <img
            src={home_logo}
            className="max-h-20 max-w-32 text-xs"
            alt="home-logo"
          />{" "}
        </div>
        <div className="text-base">{home_name}</div>
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl">
        {home_score ?? 0}
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl">
        {away_score ?? 0}
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        <div className="max-h-3/5">
          <img
            src={away_logo}
            className="max-h-20 max-w-32 text-xs"
            alt="away-logo"
          />
        </div>
        <div className="text-base">{away_name}</div>
      </div>
      <div className="w-1/12 bg-white text-black flex items-center justify-center text-5xl">
        +
      </div>
    </div>
  );
}
