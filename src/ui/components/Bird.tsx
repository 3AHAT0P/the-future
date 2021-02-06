import { Component } from 'VirtualTree';
import RectanglePrimitive from './primitives/Rectangle';
import CirclePrimitive from './primitives/Circle';
import TrianglePrimitive from './primitives/Triangle';

interface TrianglePoints {
  first: Point;
  second: Point;
  third: Point;
}

interface BirdProps extends VirtualTree.Props {
  position: Point;
  rotationAngle: number;
}

export default class Bird extends Component<BirdProps> {
  private _canvas: HTMLCanvasElement = document.createElement('canvas');

  private _ctx = this._canvas.getContext('2d');

  private _bodyWidth = 40;

  private _bodyHeight = 100;

  private _eyeRadius = 6;

  private _wingWidth = 50;

  private _beakHeight = 15;

  private _wingFlapCycleIndex = 0;

  private _wingFlapCycle = [1, 2, 4, 2, 1];

  private _buildPartsPosition(bodyPosition: Point) {
    const wingSizeMod = 1 / this._wingFlapCycle[this._wingFlapCycleIndex];
    this._wingFlapCycleIndex += 1;
    if (this._wingFlapCycleIndex >= this._wingFlapCycle.length) this._wingFlapCycleIndex = 0;
    return {
      beak: {
        first: { x: bodyPosition.x + this._bodyWidth / 2 - 10, y: bodyPosition.y + this._bodyHeight },
        second: { x: bodyPosition.x + this._bodyWidth / 2, y: bodyPosition.y + this._bodyHeight + this._beakHeight },
        third: { x: bodyPosition.x + this._bodyWidth / 2 + 10, y: bodyPosition.y + this._bodyHeight },
      },
      eyes: [
        {
          x: bodyPosition.x + 8 + this._eyeRadius / 2,
          y: bodyPosition.y + this._bodyHeight - 10 - this._eyeRadius / 2,
        },
        {
          x: bodyPosition.x + this._bodyWidth - 8 - this._eyeRadius / 2,
          y: bodyPosition.y + this._bodyHeight - 10 - this._eyeRadius / 2,
        },
      ],
      wings: [
        {
          first: { x: bodyPosition.x, y: bodyPosition.y + 70 },
          second: { x: bodyPosition.x, y: bodyPosition.y + 30 },
          third: { x: bodyPosition.x - this._wingWidth * wingSizeMod, y: bodyPosition.y + 55 },
        },
        {
          first: { x: bodyPosition.x + this._bodyWidth, y: bodyPosition.y + 70 },
          second: { x: bodyPosition.x + this._bodyWidth, y: bodyPosition.y + 30 },
          third: { x: bodyPosition.x + this._bodyWidth + this._wingWidth * wingSizeMod, y: bodyPosition.y + 55 },
        },
      ],
    };
  }

  public _mount() {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    super._mount(this._ctx);
  }

  public _update(ctx: CanvasRenderingContext2D) {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // if (this.props.needRotate) {

    // }
    this._ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
    this._ctx.rotate(this.props.rotationAngle * (Math.PI / 180));
    this._ctx.translate(-this._canvas.width / 2, -this._canvas.height / 2);

    super._update(this._ctx);

    this._ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.drawImage(
      this._canvas,
      this.props.position.x,
      ctx.canvas.height - (this._canvas.height + this.props.position.y),
    );

    // DEBUG MODE ONLY

    // ctx.strokeRect(
    //   this.props.position.x, ctx.canvas.height - (this._canvas.height + this.props.position.y),
    //   this._canvas.width, this._canvas.height,
    // );

    // ctx.fillRect(
    //   this.props.position.x + this._canvas.width / 2,
    //   ctx.canvas.height - (this._canvas.height + this.props.position.y) + this._canvas.height / 2,
    //   2, 2,
    // );
  }

  public beforeMount(): void {
    const maxSize = Math.max(this._wingWidth * 2 + this._bodyWidth, this._beakHeight + this._bodyHeight);
    this._canvas.width = maxSize;
    this._canvas.height = maxSize;
  }

  public render() {
    // const { position } = this.props;

    const position = {
      x: this._wingWidth,
      y: (this._canvas.height - (this._beakHeight + this._bodyHeight)) / 2,
    };

    const { beak, eyes, wings } = this._buildPartsPosition(position);
    return (
      <>
        <TrianglePrimitive {...beak} strokeColor='hsla(200, 50%, 50%, 1)' />
        <RectanglePrimitive
          width={this._bodyWidth}
          height={this._bodyHeight}
          leftBottom={position}
          strokeColor='hsla(0, 50%, 50%, 1)'
        />
        {eyes.map((center: Point) => (
          <CirclePrimitive radius={this._eyeRadius} center={center} strokeColor='hsla(100, 50%, 50%, 1)'/>
        ))}
        {wings.map((positions: TrianglePoints) => (
          <TrianglePrimitive {...positions} strokeColor='hsla(200, 50%, 50%, 1)'/>
        ))}
      </>
    );
  }
}
