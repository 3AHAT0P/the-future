import { Component } from 'VirtualTree';

import HomeScene from './scenes/home';

interface AppProps extends VirtualTree.Props {
  canvas: HTMLCanvasElement;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default class App extends Component<AppProps> {
  public static create(props: AppProps): App {
    return super.create<AppProps>(props) as App;
  }

  private _canvas: HTMLCanvasElement | null = null;

  private _ctx: CanvasRenderingContext2D | null = null;

  public applyProps(props: AppProps): void {
    super.applyProps(props);
    this._canvas = props.canvas;
    this._ctx = props.canvas.getContext('2d');
  }

  public _mount() {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    super._mount(this._ctx);
  }

  public _update() {
    if (this._canvas == null) throw new Error('Canvas is incorrect!');
    if (this._ctx == null) throw new Error('Context is incorrect!');

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    super._update(this._ctx);
  }

  public render() {
    return <HomeScene />;
  }
}
