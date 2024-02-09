import React from 'react'

export default function OneTable({standing}) {
  return (
    <div className="text-base text-gray-200 text-center w-80">
    <div className="text-center bg-green-800 rounded-t-md">
      {standing[0].group.name}
    </div>
    <div className="bg-green-600 rounded-b-md">
      {standing.map((s) => (
        <div key={s.team.id} className="flex h-9 ">
          <div className="w-20 flex justify-center">
            <img src={s.team.logo} className="max-h-10 max-w-16" />
          </div>
          <div className="text-center">{`${s.team.name}`}</div>
        </div>
      ))}
    </div>
  </div>
  )
}
