export const GAME_SIZES = [5, 6, 7, 8, 9, 10];

export const allGameSizeFilters = (bool) => GAME_SIZES.reduce((prev, num) => ({
  ...prev, [num]: bool,
}), {});
