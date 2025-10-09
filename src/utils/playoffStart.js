let playoffStart = {
  2274: null,
  1304: null
};

export default function (league_id) {
  let date = playoffStart[league_id];
  return date ?? null;
}
