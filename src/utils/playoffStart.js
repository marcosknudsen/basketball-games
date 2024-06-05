let playoffStart = {
  1304: "2024-05-25",
  7592: "2024-04-16",
  2274: "2024-04-13",
  1525: "2024-05-15",
};

export default function (league_id) {
  let date = playoffStart[league_id];
  return date ?? null;
}
