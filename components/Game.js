import React from 'react';
import NameList from './NameList';
import VoteTable from './VoteTable';

export default function Game({ data, i, numItems }) {
  return (
    <div className={`w-full max-w-md p-4 ${data.winningTeam === 'Spy' ? 'bg-red-600' : 'bg-blue-600'} rounded-lg shadow`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl">
          How the game was won:
          {' '}
          {data.howTheGameWasWon}
        </h1>
        <p className="text-xl px-4 py-2 rounded bg-gray-400 ml-4 text-center shadow">
          <span className="font-black">{data.numberOfPlayers}</span>
          {' '}
          Players
        </p>
      </div>
      <div className="flex flex-wrap mt-4">
        <NameList id="resistance" title="Resistance" names={data.resistanceTeam.map((name) => `${name}: ${data.playerRoles[name].role}`)} color="blue" />
        <NameList id="spies" title="Spies" names={data.spyTeam.map((name) => `${name}: ${data.playerRoles[name].role}`)} color="red" />
        {data.botUsernames.length > 0 && <NameList id="bots" title="Bots" names={data.botUsernames} color="gray" />}
      </div>
      <div className="mt-4">
        <NameList id="roles" title="Special Roles" names={data.roles} color="green" fluid />
      </div>
      <div className="mt-4">
        <VoteTable
          history={data.voteHistory}
          missionHistory={data.missionHistory}
          numFails={data.numFailsHistory}
        />
      </div>
      <div className="mt-4 text-right">
        Game
        {' '}
        {data.i + 1}
        /
        {numItems}
      </div>
    </div>
  );
}
