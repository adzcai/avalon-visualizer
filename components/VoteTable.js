import React from 'react';

export default function VoteTable({
  history, missionHistory, numFails, names, color,
}) {
  const playerNames = Object.keys(history);
  const numQuests = history[playerNames[0]].length;

  return (
    <div className="w-full overflow-scroll">
      <table className="w-full border-gray-400 border-solid border-4">
        <thead className="border-gray-400 border-solid border-b-4">
          <tr>
            <td className={`bg-${color}-200`} />
            {[...Array(numQuests)].map((_, i) => (
              <td key={`quest-status-${i}`} colSpan={history[playerNames[0]][i].length} className={`${missionHistory[i] === 'succeeded' ? 'bg-green-400' : 'bg-red-400'} border-l-4 border-solid border-gray-400 text-center`}>
                {missionHistory[i] === 'succeeded' ? 'Success' : `${numFails[i] ?? '?'} Fail${numFails[i] === 1 ? '' : 's'}`}
              </td>
            ))}
          </tr>
          <tr>
            <td className={`bg-${color}-200`} />
            {[...Array(numQuests)].map((_, i) => {
              const votes = history[playerNames[0]][i];
              return votes.map((__, j) => (
                <th key={`quest-${i}-${j}`} className={`${!j && 'border-l-4 border-gray-400 border-solid'} ${missionHistory[i] === 'succeeded' ? 'bg-green-600' : 'bg-red-600'} px-1`}>
                  {i + 1}
                  .
                  {j + 1}
                </th>
              ));
            })}
          </tr>
        </thead>
        <tbody>
          {playerNames.map((name, row) => (
            <tr key={`history-${name}`}>
              <td className={`py-2 px-4 bg-${color}-${row % 2 === 0 ? 600 : 800} text-gray-200`}>{names[name]}</td>
              {history[name].map((questArr) => questArr.map((str, i) => (
                <td key={`vote-${name}-${i}`} className={`text-center ${!i && 'border-l-4 border-gray-400 border-solid'} ${str.includes('VHreject') ? 'bg-red-400' : 'bg-green-400'} ${str.includes('VHleader') && 'border-4 border-gray-800 border-solid'}`}>
                  {str.includes('VHpicked') && 'X'}
                </td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
