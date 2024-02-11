import React from "react";

export default function Table({
  standing,
  className
}) {
  return (
    <table
      className={`text-base text-gray-200 text-center border ${className??""}`}
    >
      <thead className="text-center bg-green-800 rounded-t-md">
        {standing[0].group.name}
      </thead>
      <tbody className="bg-green-600 rounded-b-md p-1">
        {standing.map((s) => (
          <tr
            key={s.team.id}
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
        ))}
      </tbody>
    </table>
  );
}
