import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-400 min-h-screen flex flex-col items-center">
      <div className="flex items-center gap-5">
        <img src="https://cdn-icons-png.flaticon.com/512/889/889455.png" alt="basketball-icon" className="w-20" />
        <p className="text-5xl uppercase font-bold">Promiedos Basketball</p>
      </div>
      <Outlet />
    </div>
  );
}
