import { Link } from "react-router-dom";
export default function Table({
  standing,
  className
}) {
  return (
    <table
      className={`text-base text-gray-200 text-center border ${className ?? ""}`}
    >
      <thead className="text-center bg-green-800 rounded-t-md">
        {standing[0].group.name}
      </thead>
      <tbody className="bg-green-600 rounded-b-md p-1">
        {standing.map((s) => (
          <Link to={`/team/${s.team.id}`} key={s.team.id}>
            <tr
              className={`flex border first-of-type:border-t-2`}
            >
              <td>{s.position}°</td>
              <td className="justify flex justify-center">
                <img
                  src={s.team.logo}
                />
              </td>
              <td className="text-left">{`${s.team.name}`}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
}
