import fixLeagues from "./fixLeagues";

export default function fixMatches(matches) {
  matches.map((m) => fixLeagues(m.league));
  matches=matches.filter((m)=>m.home.id!=979580&&m.away.id!=979580)
  matches=matches.filter(m=>![7769868,7769869,7769870,7769820].includes(parseInt(m.id)))
  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
