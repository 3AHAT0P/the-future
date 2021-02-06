import { Component } from 'VirtualTree';
import { RoundedLinePrimitive } from './primitives';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function floorNumber(value: number, precision: number) {
  return Math.floor(value * 10 ** precision) / 10 ** precision;
}

function getRandomIntInclusive<T extends number>(min: number, max: number): T {
  return Math.floor(Math.random() * (max - min + 1)) + min as T;
}

interface NestProps extends VirtualTree.Props {
  position: Point;
  diameter: number;
}

export default class Nest extends Component<NestProps> {
  private _canvas: HTMLCanvasElement = document.createElement('canvas');

  private _ctx = this._canvas.getContext('2d');

  private _branchesInTheNest: JSX.Element[] = [];

  private _isDirty = true;

  private _oldProps: NestProps | null = null;

  private _buildCoordsForNest(length: number, start: Point, radius: number, quarter: 1 | 2 | 3 | 4) {
    const saturation = getRandomIntInclusive(10, 90);
    const lightness = getRandomIntInclusive(5, 70);
    const alpha = floorNumber(getRandomArbitrary(0.1, 0.9), 2);

    const a = Math.sqrt((length ** 2) / 2);

    let middle;
    let end;
    if (quarter === 1) {
      middle = { x: start.x, y: start.y + a };
      end = { x: start.x - a, y: start.y + a };
    } else if (quarter === 2) {
      middle = { x: start.x - a, y: start.y };
      end = { x: start.x - a, y: start.y - a };
    } else if (quarter === 3) {
      middle = { x: start.x, y: start.y - a };
      end = { x: start.x + a, y: start.y - a };
    } else if (quarter === 4) {
      middle = { x: start.x + a, y: start.y };
      end = { x: start.x + a, y: start.y + a };
    } else throw new Error('Incorrect quarter');
    return <RoundedLinePrimitive
      start={start}
      middle={middle}
      end={end}
      radius={radius}
      strokeColor={`hsla(60, ${saturation}%, ${lightness}%, ${alpha})`}
    />;
  }

  public applyProps(props: NestProps): void {
    this._shouldRerender(this.props, props);
    this._oldProps = this.props;
    super.applyProps(props);
  }

  private _shouldRerender(oldProps: NestProps, newProps: NestProps) {
    if (
      oldProps.diameter !== newProps.diameter
      || oldProps.position.x !== newProps.position.x
      || oldProps.position.y !== newProps.position.y
    ) this._isDirty = true;
  }

  public _mount() {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    super._mount(this._ctx);

    this._isDirty = false;
  }

  public _update(ctx: CanvasRenderingContext2D) {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    if (this._isDirty) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

      super._update(this._ctx);

      this._isDirty = false;
    }

    ctx.drawImage(
      this._canvas,
      this.props.position.x,
      ctx.canvas.height - (this._canvas.height + this.props.position.y),
    );
  }

  public buildBranches(): void {
    const { diameter } = this.props;

    const x = diameter / 2;
    const y = diameter / 2;

    this._canvas.width = diameter * 1.5;
    this._canvas.height = diameter * 1.5;

    const innerMaxX = x + diameter / 10;
    const innerMaxY = y + diameter / 10;
    const innerMinX = x - diameter / 10;
    const innerMinY = y - diameter / 10;

    const outerMaxX = x + diameter * (4 / 10);
    const outerMaxY = y + diameter * (4 / 10);
    const outerMinX = x - diameter * (4 / 10);
    const outerMinY = y - diameter * (4 / 10);

    this._branchesInTheNest = [];

    for (let i = 0; i < 300; i += 1) {
      const length = getRandomIntInclusive(10, 100);
      const quarer: 1 | 2 | 3 | 4 = getRandomIntInclusive(1, 4);
      let position;

      if (quarer === 1) {
        position = {
          x: getRandomIntInclusive(innerMaxX, outerMaxX),
          y: getRandomIntInclusive(innerMaxY, innerMaxY),
        };
      } else if (quarer === 2) {
        position = {
          x: getRandomIntInclusive(innerMinX, innerMaxX),
          y: getRandomIntInclusive(innerMaxY, outerMaxY),
        };
      } else if (quarer === 3) {
        position = {
          x: getRandomIntInclusive(outerMinX, innerMinX),
          y: getRandomIntInclusive(innerMinY, innerMaxY),
        };
      } else {
        position = {
          x: getRandomIntInclusive(innerMaxX, innerMaxX),
          y: getRandomIntInclusive(outerMinY, innerMinY),
        };
      }
      this._branchesInTheNest.push(this._buildCoordsForNest(
        length,
        position,
        length / getRandomIntInclusive(0, 2),
        quarer,
      ));
    }
    for (let i = 0; i < 100; i += 1) {
      const length = getRandomIntInclusive(2, 30);
      const quarer: 1 | 2 | 3 | 4 = getRandomIntInclusive(1, 4);
      let position;

      // eslint-disable-next-line max-len
      if (quarer === 1) {
        position = { x: getRandomIntInclusive(innerMinX, innerMaxX), y: getRandomIntInclusive(innerMinY, innerMaxY) };
      } else if (quarer === 2) {
        position = { x: getRandomIntInclusive(innerMinX, innerMaxX), y: getRandomIntInclusive(innerMinY, innerMaxY) };
      } else if (quarer === 3) {
        position = { x: getRandomIntInclusive(innerMinX, innerMaxX), y: getRandomIntInclusive(innerMinY, innerMaxY) };
      } else {
        position = { x: getRandomIntInclusive(innerMinX, innerMaxX), y: getRandomIntInclusive(innerMinY, innerMaxY) };
      }
      this._branchesInTheNest.push(this._buildCoordsForNest(
        length,
        position,
        length / getRandomIntInclusive(0, 2),
        quarer,
      ));
    }
  }

  public render() {
    if (this._oldProps == null) this.buildBranches();
    if (this._oldProps != null && this._oldProps.diameter !== this.props.diameter) this.buildBranches();
    return (
      <>
        {this._branchesInTheNest}
      </>
    );
  }
}
