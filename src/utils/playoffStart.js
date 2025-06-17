let playoffStart = {
  2274: '2025-04-19',
  1304: '2025-05-21'
};

export default function (league_id) {
  let date = playoffStart[league_id];
  return date ?? null;
}
