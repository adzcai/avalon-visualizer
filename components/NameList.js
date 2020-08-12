import React from 'react';

export default function NameList({
  title, names, color, fluid,
}) {
  return (
    <div className={fluid ? 'w-full' : 'w-1/2'}>
      <h1 className={`px-4 py-2 bg-${color}-200 rounded-t font-bold text-xl`}>{title}</h1>
      <ul>
        {names.length > 0
          ? names.map((name, i) => (
            <li
              key={name}
              className={`px-4 py-2 text-gray-200 ${i % 2 === 0 ? `bg-${color}-600` : `bg-${color}-800`} ${i === names.length - 1 && 'rounded-b'}`}
            >
              {name}
            </li>
          )) : (
            <li className={`px-4 py-2 text-gray-200 bg-${color}-600 rounded-b`}>
              None
            </li>
          )}
      </ul>
    </div>
  );
}
