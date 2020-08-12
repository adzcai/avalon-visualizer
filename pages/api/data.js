import data from '../../lib/data-full.json';
import { allGameSizeFilters } from '../../lib/util';

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
