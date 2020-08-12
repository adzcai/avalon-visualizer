import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Game from '../components/Game';
import PageButtons from '../components/PageButtons';
import { allGameSizeFilters, GAME_SIZES } from '../lib/util';

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

  return (
    <div>
      <div className="p-6 flex justify-between">
        <div>
          <label className="font-bold" htmlFor="page-size">Page Size</label>
          <input type="number" id="page-size" placeholder={pageSize} onBlur={handlePageSizeChange} onKeyUp={(e) => e.keyCode === 13 && handlePageSizeChange(e)} className="shadow appearance-none border ml-2 w-16 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center">
          <p className="font-bold">Filter by number of players</p>
          {GAME_SIZES.map((num) => (
            <div key={`game-size-filter-${num}`}>
              <label htmlFor={`size-filter-${num}`} className="ml-4">{num}</label>
              <input
                type="checkbox"
                id={`size-filter-${num}`}
                value={num}
                onChange={handleGameSizeChange}
                className="ml-1"
                checked={gameSizeFilter[num]}
              />
            </div>
          ))}
          <button type="button" className="bg-blue-400 rounded px-4 py-2 ml-4" onClick={() => setGameSizeFilter(allGameSizeFilters(true))}>Select All</button>
          <button type="button" className="bg-blue-400 rounded px-4 py-2 ml-4" onClick={() => setGameSizeFilter(allGameSizeFilters(false))}>Deselect All</button>
        </div>
      </div>
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
            <Game data={game} numItems={total} />
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
