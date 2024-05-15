import getStandings from "../../services/getStandings"

export async function loader({ params }) {
    return await getStandings(params.leagueId)
}