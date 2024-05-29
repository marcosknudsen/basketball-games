import Table from "@components/Table";

export default function OneTable({ standing,qualifyArray }) {
  return (<Table standing={standing} className="full" qualifyArray={qualifyArray}/>);
}
