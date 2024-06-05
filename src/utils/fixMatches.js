import fixLeagues from "./fixLeagues";

export default function fixMatches(matches) {
  matches.map((m) => fixLeagues(m.league));
  matches=matches.filter((m)=>m.home.id!=979580&&m.away.id!=979580)
  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
