import React from "react";
import ReactDOM from "react-dom/client";
import Index, { loader as todayLoader } from "./pages/Index";
import Tomorrow, { loader as tomorrowLoader } from "./pages/Tomorrow";
import Yesterday, { loader as yesterdayLoader } from "./pages/Yesterday";
import Standing, { loader as standingLoader } from "./pages/Standing";
import TeamMatches, { loader as teamMatchesLoader } from "./pages/TeamMatches";
import Match, { loader as gameStatsLoader } from "./pages/Match";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import "./index.css";
import "../Match.css";
import "../Layout.css";

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
