import data1 from '../../lib/data-1.json';
import data2 from '../../lib/data-2.json';
import data3 from '../../lib/data-3.json';
import data4 from '../../lib/data-4.json';
import data5 from '../../lib/data-5.json';
import { allGameSizeFilters } from '../../lib/util';

const data = [...data1, ...data2, ...data3, ...data4, ...data5];

console.log(`All ${data.length} games successfully loaded`);

export default (req, res) => {
  const {
    cursor = 0, pageSize = 20, gameSizeFilter = allGameSizeFilters(true),
  } = req.body;
  const games = data
    .filter((game) => gameSizeFilter[game.numberOfPlayers]);
  res.status(200).json({
    games: games.map((val, i) => ({ ...val, i })).slice(cursor, cursor + pageSize),
    total: games.length,
  });
};
