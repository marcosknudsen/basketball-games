import React from "react";

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
      <div className="bg-white w-1/12 text-black justify-center items-center flex text-xl">
        {date}
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        <div className="flex justify-center">
          <img src={home_logo} className="w-3/5" alt="home-logo" />{" "}
        </div>
        <div>{home_name}</div>
      </div>
      <div className="w-1/6 items-center justify-center flex text-4xl">{home_score??0}</div>
      <div className="w-1/6 items-center justify-center flex text-4xl">{away_score??0}</div>
      <div className="w-1/4 flex justify-center items-center flex-col">
      <div className="w-3/5 flex justify-center">
          <img src={away_logo} className="w-3/5" alt="away-logo" />
        </div>
        <div>{away_name}</div>
      </div>
      <div className="w-1/12 bg-white text-black flex items-center justify-center text-5xl">+</div>
    </div>
  );
}
