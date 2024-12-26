const leaguesConfig = {
  2274: { standings: ["Western Conference", "Eastern Conference"] },
  7592: {
    standings: [
      "Liga Argentina 24/25, Apertura, Group South B",
      "Apertura, Group South A",
      "Liga Argentina 24/25, Apertura, Group North B",
      "Liga Argentina 24/25, Apertura, Group North A",
    ],
  },
};

export default function fixLeaguesStanding(league_id) {
  return leaguesConfig[league_id] ? leaguesConfig[league_id].standings : [];
}
