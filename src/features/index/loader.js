import getMatches from "@/services/getMatches.js";

export default async function loader() {
  const today = new Date(Date.now());
  return await getMatches(today);
}