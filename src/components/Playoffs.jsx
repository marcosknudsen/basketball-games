import React from 'react'
import Week from './Week'

export default function Playoffs({ matches }) {

  return (
    <div className="w-3/4 max-w-[800px] lg:w-full">
      {[...new Set(matches.map((m) => m.week))].reverse()
        .map((week) => (
          <Week matches={matches.filter((m) => m.week == week)} key={week} />
        ))}
    </div>
  )
}
