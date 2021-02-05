import './jsx.d';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Constructor<T> = new (...args: any[]) => T;

  interface Point {
    x: number; // number of pixels from the left side
    y: number; // number of pixels from the bottom side
  }
}

export { };
