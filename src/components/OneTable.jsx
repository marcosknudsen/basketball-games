import Table from "@components/Table";

export default function OneTable({ standing,qualifyArray,leagueId }) {
  return (<Table standing={standing} className="full" qualifyArray={qualifyArray} leagueId={leagueId}/>);
}
