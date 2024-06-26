import Table from "@components/Table";

export default function TwoTables({ standing1, standing2, className, qualifyArray, leagueId }) {
  return (
    <div
      className={`text-base text-gray-200 text-center flex justify-evenly w-5/6 md:flex-col md:gap-5 ${className ?? ""} `}
    >
      <div className="flex justify-center">
        <Table standing={standing1} className="half" qualifyArray={qualifyArray} leagueId={leagueId} />
      </div>
      <div className="flex justify-center">
        <Table standing={standing2} className="half" qualifyArray={qualifyArray} leagueId={leagueId} />
      </div>
    </div>
  );
}
