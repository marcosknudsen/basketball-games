import getMatches from "@/services/getMatches.js";

export default async function loader() {
  const yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate()-1)
  return await getMatches(yesterday);
}