/* eslint-disable max-classes-per-file */
import { Component } from 'VirtualTree';
import RectanglePrimitive from '../components/primitives/Rectangle';

class MyBlockAtom extends Component {
  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(10, 10, 100, 100);
  }
}

export default class HomeScreen extends Component {
  private _index = 0;

  private getIndex() {
    this._index += 1;
    return this._index.toString();
  }

  public render() {
    return (
      <RectanglePrimitive width={100} height={100} left={100} bottom={100} strokeColor='hsla(0, 50%, 50%, 1)'>
      </RectanglePrimitive>
    );
  }
}
