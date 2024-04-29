import React from 'react'

export default function PlayerCard({ firstName, LastName, points, minutes, fg3a, fg3m, oreb, dreb, ast, stl, fgm, fga, fg_pct, fg3_pct, ftm, fta, ft_pct, pf, turnover, blk, reb,number }) {
  return (
    <tr className='font-medium last:border-t-2 text-md lg:text-sm md:text-xs'>
      <td className='text-center border'>{firstName + " " + LastName+" #"+number}</td>
      <td className='text-center border'>{parseInt(minutes)}</td>
      <td className='text-center border'>{fga}</td>
      <td className='text-center border'>{fgm}</td>
      <td className='text-center border'>{parseFloat((fg_pct * 100).toFixed(2))}%</td>
      <td className='text-center border'>{fg3a}</td>
      <td className='text-center border'>{fg3m}</td>
      <td className='text-center border'>{parseFloat((fg3_pct * 100).toFixed(2))}%</td>
      <td className='text-center border'>{fta}</td>
      <td className='text-center border'>{ftm}</td>
      <td className='text-center border'>{parseFloat((ft_pct * 100).toFixed(2))}%</td>
      <td className='text-center border'>{oreb}</td>
      <td className='text-center border'>{dreb}</td>
      <td className='text-center border'>{reb}</td>
      <td className='text-center border'>{ast}</td>
      <td className='text-center border'>{stl}</td>
      <td className='text-center border'>{blk}</td>
      <td className='text-center border'>{turnover}</td>
      <td className='text-center border'>{pf}</td>
      <td className='text-center border'>{points}</td>
    </tr>
  )
}
