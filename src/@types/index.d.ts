import './jsx.d';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Constructor<T> = new (...args: any[]) => T;
}

export { };
