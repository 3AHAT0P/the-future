export default (value: number, precision: number): number => {
  return Math.floor(value * 10 ** precision) / 10 ** precision;
};
