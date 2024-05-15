import getMatchesByTeam from "@/services/getMatchesByTeam";

export default async function loader({ params }) {
  return await getMatchesByTeam(params.teamId);
}