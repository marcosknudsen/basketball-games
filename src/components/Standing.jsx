import React from "react";
import getStandings from "../../helpers/getStandings";
import { useLoaderData } from "react-router-dom";
import TwoTables from "./TwoTables";
import OneTable from "./OneTable";

export async function loader({ params }) {
  return (await getStandings(params.leagueId));
}

export default function Standing() {
  const standing = useLoaderData();
  return (
    <>
      {standing.length ? (
        <div className="h-[740px] flex gap-[150px] items-center">
          {standing.length > 1 ? (
            <>
              <TwoTables standing1={standing[0]} standing2={standing[1]}/>
            </>
          ) : (
            <OneTable standing={standing[0]} />
          )}
        </div>
      ):null}
    </>
  );
}
