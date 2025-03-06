const leaguesConfig = {
  2274: { standings: ["Western Conference", "Eastern Conference"] },
  7592: {
    standings: [
      "Liga Argentina 24/25, Clausura, Group South A",
      "Liga Argentina 24/25, Clausura, Group South B",
      "Liga Argentina 24/25, Clausura, Group North A",
      "Liga Argentina 24/25, Clausura, Group North B",
    ],
  },
};

export default function fixLeaguesStanding(league_id) {
  return leaguesConfig[league_id] ? leaguesConfig[league_id].standings : [];
}
