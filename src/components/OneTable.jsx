import Table from "@components/Table";
import "../styles/components/OneTable.css";

export default function OneTable({ standing, qualifyArray, leagueId }) {
  return (
    <Table
      standing={standing}
      className="table-full"
      qualifyArray={qualifyArray}
      leagueId={leagueId}
    />
  );
}
