
import getMatchesByLeague from "../../../helpers/getMatchesByLeague"
import getStandings from "../../services/getStandings"

export async function loader({ params }) {
    return await getStandings(params.leagueId) ?? await getMatchesByLeague(params.leagueId)
}