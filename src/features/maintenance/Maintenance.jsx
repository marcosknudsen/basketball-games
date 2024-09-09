import React from 'react'

export default function Maintenance() {
  return (
    <div className='bg-green-800 p-[45px] mx-16 h-40 rounded-3xl'>
        <p className='uppercase text-yellow-400 text-3xl font-bold h-screen text-center'>
            Actualmente estamos en mantenimiento, la pagina estará disponible en Octubre con la vuelta del basquet.
            <a href='https://x.com/promiedosbasq' className='text-gray-300'> Mas informacion.</a>
        </p>
    </div>
  )
}