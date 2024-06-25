import fixLeagues from "./fixLeagues";

export default function fixMatches(matches) {
  matches.map((m) => fixLeagues(m.league));
  matches=matches.filter((m)=>m.home.id!=979580&&m.away.id!=979580)
  matches=matches.filter(m=>![7769868,7769869,7769870,7769820,7769879,7769888,7769902,7769891,7769898,7769903,7769890,7769894,7769900,7769878,7769883,7769896,7769908,7769872,7769893,7769901,7769871,7769874,7769892,7769904,7769887,7769906,7769880,7769885].includes(parseInt(m.id)))
  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
