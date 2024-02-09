import React from "react";

export default function TwoTables({ standing1, standing2 }) {
  return (
    <>
      <div className="text-base text-gray-200 text-center w-80">
        <div className="text-center bg-green-800 rounded-t-md">
          {standing1[0].group.name}
        </div>
        <div className="bg-green-600 rounded-b-md">
          {standing1.map((s) => (
            <div key={s.team.id} className="flex h-12 ">
              <div className="w-8 flex items-center justify-center">{s.position}°</div>
              <div className="w-20 flex justify-center">
                <img src={s.team.logo} className="max-h-10 max-w-16" />
              </div>
              <div className="text-center flex items-center">{`${s.team.name}`}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-base text-gray-200 text-center w-80">
        <div className="text-center bg-green-800 rounded-t-md">
          {standing2[0].group.name}
        </div>
        <div className="bg-green-600 rounded-b-md">
          {standing2.map((s) => (
            <div key={s.team.id} className="flex h-12">
              <div className="w-8 flex items-center justify-center">{s.position}°</div>
              <div className="w-20 flex justify-center">
                <img src={s.team.logo} className="max-h-10 max-w-16" />
              </div>
              <div className="text-center flex items-center">{`${s.team.name}`}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
