import React from 'react'

export default function NoMatches() {
  return (
    <div className='bg-green-800 mx-16 h-40 rounded-3xl flex md:m-10'>
      <div className='uppercase m-auto text-yellow-400 text-lg font-bold text-center md:text-xs'>
        ¡Wow, qué emoción por los partidos!
        Estamos recibiendo más solicitudes de lo esperado.
        Nuestros servidores están jugando su propio partido ahora mismo, pero pronto estarán de vuelta. ¡Inténtalo de nuevo en unos minutos!
      </div>
    </div>
  )
}