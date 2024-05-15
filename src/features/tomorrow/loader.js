import getMatches from "@/services/getMatches";

export default async function loader() {
  const tomorrow = new Date(Date.now());
  tomorrow.setDate(tomorrow.getDate()+1)
  return await getMatches(tomorrow);
}