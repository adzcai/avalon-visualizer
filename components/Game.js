import React from 'react';
import an from 'adj-noun';
import NameList from './NameList';
import VoteTable from './VoteTable';
import { capitalize } from '../lib/util';

export default function Game({ data, numItems, randomNames }) {
  // eslint-disable-next-line no-underscore-dangle
  // an.seed(parseInt(data._id, 16));

  const names = data.playerUsernamesOrdered.reduce((prev, name) => ({
    ...prev, [name]: randomNames ? an().map((s) => capitalize(s)).join('') : name,
  }), {});

  const color = data.winningTeam === 'Spy' ? 'red' : 'blue';

  const mapRoles = (teamNames) => teamNames.map((name) => (
    <span>
      {names[name]}
      :
      {' '}
      <span className="font-bold">{data.playerRoles[name].role}</span>
    </span>
  ));

  return (
    <div className={`w-full max-w-md p-4 bg-${color}-600 rounded-lg shadow`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl">
          How the game was won:
          {' '}
          {data.howTheGameWasWon}
        </h1>
        <p className="text-xl px-4 py-2 rounded bg-gray-400 ml-4 text-center">
          <span className="font-black">{data.numberOfPlayers}</span>
          {' '}
          Players
        </p>
      </div>
      <div className="flex flex-wrap mt-4">
        <NameList
          id="resistance"
          title="Resistance"
          names={mapRoles(data.resistanceTeam)}
          color="blue"
        />
        <NameList id="spies" title="Spies" names={mapRoles(data.spyTeam)} color="red" />
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
          names={names}
          color={color}
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
