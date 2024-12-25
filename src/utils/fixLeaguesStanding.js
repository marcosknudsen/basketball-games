const leaguesConfig = {
  2274: { standings: ["Western Conference", "Eastern Conference"] },
};


export default function fixLeaguesStanding(league_id) {
  return leaguesConfig[league_id] ? leaguesConfig[league_id].standings : [];
}