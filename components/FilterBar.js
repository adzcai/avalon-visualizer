import React from 'react';
import { GAME_SIZES } from '../lib/util';

export default function FilterBar({
  pageSize, handlePageSizeChange,
  gameSizeFilter, handleGameSizeChange,
  randomNamesEnabled, handleRandomNamesChange,
}) {
  return (
    <div className="p-6 flex justify-between">
      <div className="flex items-center">
        <label className="font-bold" htmlFor="page-size">Page Size</label>
        <input
          type="number"
          id="page-size"
          placeholder={pageSize}
          onBlur={handlePageSizeChange}
          onKeyUp={(e) => e.keyCode === 13 && handlePageSizeChange(e)}
          className="shadow appearance-none border ml-2 w-16 rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="random-names" className="font-bold text-right">Random Names</label>
        <input type="checkbox" id="random-names" checked={randomNamesEnabled} onChange={handleRandomNamesChange} className="ml-1" />
      </div>
      <div className="flex items-center">
        <p className="font-bold text-right">Filter by number of players</p>
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
  );
}
