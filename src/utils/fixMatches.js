import fixLeaguesName from "./fixLeaguesName";

export default function fixMatches(matches) {
  matches.map((m) => fixLeaguesName(m.league));

  matches = matches.filter((m) => m.home.id != 979580 && m.away.id != 979580);
  matches = matches.filter(
    (m) =>
      ![
        8795571
      ].includes(parseInt(m.id))
  );

  return matches.filter((m) => m.home.id != 190443 && m.away.id != 190443);
}
