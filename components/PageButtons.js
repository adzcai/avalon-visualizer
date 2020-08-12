import React from 'react';

export default function PageButtons({
  cursor, setCursor, pageSize, numItems,
}) {
  const prevDisabled = cursor <= 0;
  const nextDisabled = cursor + pageSize >= numItems;
  return (
    <div className="p-6 flex bg-gray-400 items-center justify-between">
      <div>
        <button
          type="button"
          onClick={() => setCursor(0)}
          className={`${prevDisabled ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-400'} py-2 px-4 rounded`}
          disabled={prevDisabled}
        >
          First Page
        </button>
        <button
          type="button"
          onClick={() => setCursor((prev) => Math.max(prev - pageSize, 0))}
          className={`${prevDisabled ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-400'} py-2 px-4 ml-2 rounded`}
          disabled={prevDisabled}
        >
          Previous Page
        </button>
      </div>
      <div>
        Page
        {' '}
        {Math.ceil(cursor / pageSize) + 1}
        {' '}
        of
        {' '}
        {Math.ceil(numItems / pageSize)}
      </div>
      <div>
        <button
          type="button"
          onClick={() => setCursor((prev) => prev + pageSize)}
          className={`${nextDisabled ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-400'} py-2 px-4 rounded`}
          disabled={nextDisabled}
        >
          Next Page
        </button>
        <button
          type="button"
          onClick={() => setCursor((Math.ceil(numItems / pageSize) - 1) * pageSize)}
          className={`${nextDisabled ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-400'} py-2 px-4 ml-2 rounded`}
          disabled={nextDisabled}
        >
          Last Page
        </button>
      </div>
    </div>
  );
}
