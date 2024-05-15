import TeamStats from "../../components/TeamStats.jsx"
import { useLoaderData, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Match() {
    let { stats, teamsLogos } = useLoaderData()
    const { gameId } = useParams()
    let navigate = useNavigate()
    
    let players = [stats.filter((p) => p.team.id == stats[0].team.id), stats.filter((p) => p.team.id != stats[0].team.id)]

    return (
        <>
            <button
                className="bg-green-800 p-3 rounded-md text-yellow-400 w-32 uppercase font-semibold hover:bg-green-700 transition-colors"
                onClick={() => navigate("/")}
            >
                HOME
            </button>
            {stats && stats.length ? (
                <div className="flex flex-col justify-center items-center gap-10 w-full pb-14">
                    <TeamStats players={players[0]} key={gameId + "_h"} logo={teamsLogos.home} />
                    <TeamStats players={players[1]} key={gameId + "_a"} logo={teamsLogos.away} />
                </div>
            ) : (
                <p className="uppercase text-2xl font-bold text-white">Las estadisticas estarán disponibles cuando comience el partido</p>
            )
            }
        </>
    )

}