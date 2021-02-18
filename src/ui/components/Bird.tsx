// eslint-disable-next-line max-classes-per-file
import { Component } from 'VirtualTree';
import { withIndividualContext } from '@/ui/mixins/withIndividualCanvas';

import RectanglePrimitive from './primitives/Rectangle';
import CirclePrimitive from './primitives/Circle';
import TrianglePrimitive from './primitives/Triangle';

interface TrianglePoints {
  first: Point;
  second: Point;
  third: Point;
}

interface BirdProps extends VirtualTree.Props {
  rotationAngle: number;
  onClick?: () => void;
}

// @ts-ignore: Конструкторы базового класса должны иметь одинаковые типы возвращаемых значений.ts(2510)
export default class Bird extends withIndividualContext(Component)<BirdProps> {
  private _bodyWidth = 40;

  private _bodyHeight = 100;

  private _eyeRadius = 6;

  private _wingWidth = 50;

  private _beakHeight = 15;

  private _wingFlapCycleIndex = 0;

  private _wingFlapCycle = [1, 2, 4, 2, 1];

  protected get canvasSize(): Size {
    const maxSize = Math.max(this._wingWidth * 2 + this._bodyWidth, this._beakHeight + this._bodyHeight);
    return { width: maxSize, height: maxSize };
  }

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

  public handleClick(event: MouseEvent) {
    super.handleClick(event);

    // const { height } = event.target as HTMLCanvasElement;

    if (event.offsetX >= this.props.position.x && event.offsetX <= (this.props.position.x + this._canvas.width)
      && event.offsetY >= this.props.position.y
      && event.offsetY <= (this.props.position.y + this._canvas.height)
    ) {
      console.log('Ptee-Ptee');
      if (this.props.onClick != null && this.props.onClick instanceof Function) this.props.onClick();
    }
  }

  public _update(ctx: CanvasRenderingContext2D) {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    this._ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
    this._ctx.rotate(this.props.rotationAngle * (Math.PI / 180));
    this._ctx.translate(-this._canvas.width / 2, -this._canvas.height / 2);

    super._update(ctx);

    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  public render() {
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
          position={position}
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
