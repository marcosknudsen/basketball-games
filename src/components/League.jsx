import { Link } from "react-router-dom";
import MatchCard from "@components/MatchCard";

export default function League({ matches }) {
  return (
    <div className="m-3 text-center text-2xl ">
      <Link to={"/league/" + matches[0].league.id} >
        <div className=" text-yellow-400 font-semibold rounded-t-md bg-green-800 flex items-center justify-center gap-5 hover:bg-green-700 transition-all hover:gap-24 hover:font-bold">
          {
            <img
              src={
                matches[0].league.logo??`https://media.api-sports.io/flags/${matches[0].league.cc}.svg`
              }
              className="w-10"
            />
          }
          {matches[0].league.name}
          {
            <img
              src={
                matches[0].league.logo??`https://media.api-sports.io/flags/${matches[0].league.cc}.svg`
              }
              className="w-10"
            />
          }
        </div>
      </Link>
      <div className="text-white rounded-b-md bg-gray-600">
        {matches.map((m) => (
          <MatchCard
            key={m.id}
            id={m.id}
            league_id={m.league.id}
            date={m.date}
            status={m.status}
            home_name={m.home.name}
            away_name={m.away.name}
            home_logo={m.home.logo}
            away_logo={m.away.logo}
            home_image_id={m.home.image_id}
            away_image_id={m.away.image_id}
            home_score={m.scores?.split("-")[0]}
            away_score={m.scores?.split("-")[1]}
            home_team_id={m.home.id}
            away_team_id={m.away.id}
            timer={m.timer}
            round={m.round}
          />
        ))}
      </div>
    </div>
  );
}
