import React, { useState } from 'react';
import useSWR from 'swr';
import Game from '../components/Game';
import PageButtons from '../components/PageButtons';
import { allGameSizeFilters } from '../lib/util';
import FilterBar from '../components/FilterBar';

const fetcher = (url, cursor, pageSize, gameSizeFilter) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ cursor, pageSize, gameSizeFilter }),
}).then((res) => res.json());

function App() {
  const [cursor, setCursor] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [randomNames, setRandomNames] = useState(true);
  const [gameSizeFilter, setGameSizeFilter] = useState(allGameSizeFilters(true));

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value || pageSize, 10);
    if (size === pageSize) return;
    setPageSize(size);
  };

  const handleGameSizeChange = (e) => {
    const gameSize = e.target.value;
    setGameSizeFilter((prev) => ({ ...prev, [gameSize]: !prev[gameSize] }));
  };

  const { data, error } = useSWR(
    ['/api/data', cursor, pageSize, gameSizeFilter],
    (url, cur, size, filter) => fetcher(url, cur, size, filter),
  );

  if (error) {
    return (
      <div>
        <p>An unexpected error occurred:</p>
        <pre>
          {error.message}
        </pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex p-6 justify-center">
        <p className="my-16 p-6 inline-block bg-blue-400 rounded font-bold">Loading...</p>
      </div>
    );
  }

  const { games, total } = data;

  if (cursor >= total && total > 0) setCursor(Math.max(total - pageSize, 0));
  if (cursor % pageSize !== 0) setCursor(pageSize * Math.floor(cursor / pageSize));

  return (
    <div>
      <FilterBar
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
        handleGameSizeChange={handleGameSizeChange}
        gameSizeFilter={gameSizeFilter}
        randomNamesEnabled={randomNames}
        handleRandomNamesChange={() => setRandomNames((prev) => !prev)}
      />
      <PageButtons
        cursor={cursor}
        setCursor={setCursor}
        pageSize={pageSize}
        numItems={total}
      />
      <div className="flex flex-wrap">
        {/* eslint-disable-next-line no-underscore-dangle */}
        {games.map((game) => (
          // eslint-disable-next-line no-underscore-dangle
          <div key={game._id} className="p-4">
            <Game data={game} numItems={total} randomNames={randomNames} />
          </div>
        ))}
      </div>
      <PageButtons
        cursor={cursor}
        setCursor={setCursor}
        pageSize={pageSize}
        numItems={total}
      />
    </div>
  );
}

export default App;
