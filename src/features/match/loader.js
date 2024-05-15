import getMatchStats from "@/services/getMatchStats.js"

export default async function loader({ params }) {
    return await getMatchStats(params.gameId)
}