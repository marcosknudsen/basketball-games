import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-cyan-700 min-h-screen flex flex-col items-center gap-5 pt-5">
      <div className="flex items-center justify-center gap-5 sm:gap-2">
        <img src="https://cdn-icons-png.flaticon.com/512/889/889455.png" alt="basketball-icon" className="w-20 sm:w-10" />
        <p className="text-5xl uppercase text-white font-bold sm:text-2xl">Promiedos Basketball</p>
      </div>
      <Outlet />
    </div>
  );
}
