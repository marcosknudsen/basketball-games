import { SHORT_CODE_PLAYING,HALFTIME_STRING } from "./constants";
import fixLeagues from "./fixLeagues";

export default function fixMatches(matches) {
  matches.map((m) => {
    fixLeagues(m.league);
    if (m.status==SHORT_CODE_PLAYING&& m.timer.q == "3" && m.timer.tm == "10" && m.timer.ts == "0") {
      m.timer.q = HALFTIME_STRING;
    }
  });

  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
