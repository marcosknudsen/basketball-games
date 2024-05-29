import fixLeagues from "./fixLeagues";

export default function fixMatches(matches) {
  matches.map((m) => fixLeagues(m.league));
  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
