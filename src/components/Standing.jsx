import React from "react";
import getStandings from "../../helpers/getStandings";
import { useLoaderData } from "react-router-dom";
import TwoTables from "./TwoTables";
import OneTable from "./OneTable";
import { useNavigate } from "react-router-dom";

export async function loader({ params }) {
  return await getStandings(params.leagueId);
}

export default function Standing() {
  const standing = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      {standing.length ? (
        <>
          <div>
            <button
              className="bg-green-800 p-3 rounded-md text-yellow-400 w-28 uppercase"
              onClick={() => navigate("/")}
            >
              HOME
            </button>
          </div>
          <div className="min-h-[740px] flex gap-[150px] items-center w-full justify-center">
            {standing.length > 1 ? (
              <>
                <TwoTables standing1={standing[0]} standing2={standing[1]} />
              </>
            ) : (
              <OneTable standing={standing[0]} />
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
