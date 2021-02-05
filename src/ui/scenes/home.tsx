import { Component } from 'VirtualTree';
import Bird from '../components/Bird';

export default class HomeScreen extends Component {
  private _birdPosition: Point = { x: 100, y: 100 };

  private _rotationAngle = 0;

  public render(ctx: CanvasRenderingContext2D) {
    if (
      (this._birdPosition.y + 150 >= ctx.canvas.height && this._rotationAngle % 360 < 180)
      || (this._birdPosition.y <= 0 && this._rotationAngle % 360 >= 180)
    ) this._rotationAngle += 5;
    else this._birdPosition.y += this._rotationAngle % 360 < 180 ? 5 : -5;

    return <Bird position={this._birdPosition} rotationAngle={this._rotationAngle} />;
  }
}
