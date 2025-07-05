import { Link } from "react-router-dom";
import MatchCard from "@components/MatchCard";
import "../styles/components/League.css";

export default function League({ matches }) {
  const league = matches[0].league;
  const logo =
    league.logo ?? `https://media.api-sports.io/flags/${league.cc}.svg`;

  return (
    <div className="league-container">
      <Link to={`/league/${league.id}`}>
        <div className="league-header">
          <img src={logo} className="league-logo" />
          {league.name}
          <img src={logo} className="league-logo" />
        </div>
      </Link>
      <div className="league-body">
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
