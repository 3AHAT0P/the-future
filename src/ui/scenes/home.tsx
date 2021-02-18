import { Component } from 'VirtualTree';
import { TextPrimitive } from '../components/primitives';
import Bird from '../components/Bird';
import Nest from '../components/Nest';

export default class HomeScreen extends Component {
  private _birdPosition: Point = { x: 100, y: 500 };

  private _rotationAngle = 180;

  private _isVisibleBirdVoice = false;

  private _showWhatBirdSay() {
    this._isVisibleBirdVoice = true;
    setTimeout(() => { this._isVisibleBirdVoice = false; }, 5 * 1000);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (
      (this._birdPosition.y + 200 >= ctx.canvas.height && this._rotationAngle % 360 < 180)
      || (this._birdPosition.y <= 50 && this._rotationAngle % 360 >= 180)
    ) {
      this._rotationAngle += 5;

      if (this._rotationAngle % 360 < 180) this._birdPosition.x -= 3;
      else this._birdPosition.x += 3;

      this._birdPosition.y += Math.cos((this._rotationAngle % 360) * (Math.PI / 180)) * 5;
    } else this._birdPosition.y += this._rotationAngle % 360 < 180 ? 5 : -5;

    return <>
      <Bird
        position={this._birdPosition}
        rotationAngle={this._rotationAngle}
        onClick={() => { this._showWhatBirdSay(); }}
      />
      <Nest position={{ x: 500, y: 500 }} diameter={200} />
      {this._isVisibleBirdVoice
        && <TextPrimitive
            position={this._birdPosition}
            text="Ptee Ptee"
            fillColor='hsla(200, 50%, 50%, 1)'
          />
      }
    </>;
  }
}
