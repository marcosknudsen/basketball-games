import { Link } from "react-router-dom";
export default function Table({
  standing,
  className,
  qualifyArray
}) {
  return (
    <table
      className={`text-base text-gray-200 text-center border ${className ?? ""}`}
    >
      <thead className="text-center bg-green-800 rounded-t-md">
        {standing[0].group.name}
      </thead>
      <tbody className="bg-gray-500 rounded-b-md p-1">
        {standing.map((s, index) => (
          <Link to={`/team/${s.team.id}`} key={s.team.id}>
            <tr
              className={"flex border first-of-type:border-t-2"} style={{backgroundColor:`${qualifyArray ? qualifyArray[index] ?? "" : "rgb(22 163 74)"}`}}
            >
              <td>{s.position}°</td>
              <td className="justify flex justify-center">
                <img
                  src={s.team.logo}
                />
              </td>
              <td className="text-center font-bold">{s.team.name}</td>
              <td className="w-1/12 font-bold">{`${s.games.win.total}-${s.games.lose.total}`}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
}
