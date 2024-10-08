let playoffStart = {
};

export default function (league_id) {
  let date = playoffStart[league_id];
  return date ?? null;
}
