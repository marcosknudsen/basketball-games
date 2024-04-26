import PlayerCard from "./PlayerCard"

export default function TeamStats({ players, logo }) {
    return (
        <>
            <div className="flex flex-col bg-emerald-600 text-gray-300 w-[75%] md:w-[95%] rounded-xl pt-1 border-[4px] overflow-x-auto">
                <div className="flex justify-center uppercase font-bold text-4xl lg:text-3xl md:text-2xl sm:text-sm gap-10 items-center pb-1 italic text-center md:gap-3">
                    <img src={logo} alt="team logo" className="h-16 lg:h-10" />
                    {players[0].team.full_name}
                    <img src={logo} alt="team logo" className="h-16 lg:h-10" />
                </div>
                <table>
                    <thead>
                        <tr className="uppercase text-md lg:text-xs border-y-2 font-semibold italic">
                            <td className="text-center">Jugador</td>
                            <td className="text-center">Min</td>
                            <td className="text-center">fgm</td>
                            <td className="text-center">fga</td>
                            <td className="text-center">fg%</td>
                            <td className="text-center">fg3a</td>
                            <td className="text-center">fg3m</td>
                            <td className="text-center">fg3%</td>
                            <td className="text-center">ftm</td>
                            <td className="text-center">fta</td>
                            <td className="text-center">ft%</td>
                            <td className="text-center">oreb</td>
                            <td className="text-center">dreb</td>
                            <td className="text-center">reb</td>
                            <td className="text-center">ast</td>
                            <td className="text-center">stl</td>
                            <td className="text-center">blk</td>
                            <td className="text-center">to</td>
                            <td className="text-center">pf</td>
                            <td className="text-center">Pts</td>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p) => (
                            <PlayerCard
                                id={p.id}
                                firstName={p.player.first_name}
                                LastName={p.player.last_name}
                                points={p.pts}
                                minutes={p.min}
                                fg3a={p.fg3a}
                                fg3m={p.fg3m}
                                oreb={p.oreb}
                                dreb={p.dreb}
                                ast={p.ast}
                                stl={p.stl}
                                fgm={p.fgm}
                                fga={p.fga}
                                fg_pct={p.fg_pct}
                                fg3_pct={p.fg3_pct}
                                ftm={p.ftm}
                                fta={p.fta}
                                ft_pct={p.ft_pct}
                                reb={p.reb}
                                blk={p.blk}
                                turnover={p.turnover}
                                pf={p.pf}
                                number={p.player.jersey_number}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
