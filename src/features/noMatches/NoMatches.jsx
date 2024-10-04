import React from 'react'

export default function NoMatches() {
  return (
    <div className='bg-green-800 p-[45px] mx-16 h-40 rounded-3xl'>
        <p className='uppercase text-yellow-400 text-3xl font-bold h-screen text-center'>
            No hay partidos en el dia seleccionado
        </p>
    </div>
  )
}