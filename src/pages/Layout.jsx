import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";

export default function Layout() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position)
  }

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="bg-cyan-700 min-h-screen flex flex-col items-center gap-5 pt-5">
      {scrollPosition > 500 &&
        <button onClick={handleClick} className="fixed right-16 bottom-10 py-4 px-8 rounded-lg text-2xl hover:bg-green-800 transition-all text-yellow-400 font-bold uppercase bg-green-700">
          <FaArrowUpLong fontSize={40} />
        </button>
      }
      <div className="flex items-center justify-center gap-5 sm:gap-2 w-full">
        <img
          src="https://cdn-icons-png.flaticon.com/512/889/889455.png"
          alt="basketball-icon"
          className="w-20"
          id="logo"
        />
        <p className="text-5xl uppercase text-white font-bold" id="title">
          Promiedos Basketball
        </p>
      </div>
      <Outlet />
      <p className="text-white text-sm text-center">
        Este sitio web esta basado en el mítico{" "}
        <a
          className="text-yellow-400 underline"
          href="https://www.promiedos.com.ar/"
        >
          Promiedos
        </a>{" "}
        como un proyecto personal con la única finalidad de fortalecer
        conocimeintos en las tecnologias implicadas.
      </p>
      <p className="text-right w-full mr-5 text-white">
        Powered by{" "}
        <a href="https://linktr.ee/elk4nu" className="text-yellow-400">
          Marcos Knudsen
        </a>
      </p>
    </div>
  );
}
