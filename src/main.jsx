import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "@/features/index/Index"
import todayLoader from "@/features/index/loader.js"
import Tomorrow from "@/features/tomorrow/Tomorrow"
import tomorrowLoader from "@/features/tomorrow/loader.js"
import Yesterday from "@/features/yesterday/Yesterday"
import yesterdayLoader from "@/features/yesterday/loader.js"
import TeamMatches from "@/features/teammatches/Teammatches"
import teamMatchesLoader from "@/features/teammatches/loader.js"
import Match from "@/features/match/Match"
import gameStatsLoader from "@/features/match/loader.js"
import Layout from "./features/layout/Layout";
import "./index.css";
import "@/assets/Match.css";
import "@/assets/Layout.css";
import Standing from "@/features/standing/Standing"
import { loader as standingLoader } from "@/features/standing/loader"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Index />,
              loader: todayLoader,
            },
            {
              path: "/tomorrow",
              element: <Tomorrow />,
              loader: tomorrowLoader,
            },
            {
              path: "/yesterday",
              element: <Yesterday />,
              loader: yesterdayLoader,
            },
            {
              path: "/league/:leagueId",
              element: <Standing />,
              loader: standingLoader,
            },
            {
              path: "/team/:teamId",
              element: <TeamMatches />,
              loader: teamMatchesLoader,
            },
            {
              path: "/game/:gameId/",
              element: <Match />,
              loader: gameStatsLoader,
            }
          ],
        },
      ])}
    />
  </React.StrictMode>
);
