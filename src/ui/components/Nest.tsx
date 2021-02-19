/* eslint-disable max-classes-per-file */
import { Component } from 'VirtualTree';
import { getRandomArbitrary, getRandomIntInclusive, floorNumber } from '@/common/utils/math';
import { withIndividualCanvas } from '@/ui/mixins/withIndividualCanvas';

import { RoundedLinePrimitive } from './primitives';

const get = <T extends unknown = unknown>(target: T, key: string): unknown => {
  if (target == null) return target;

  const path = key.split('.');
  let value: any = target;
  for (const part of path) {
    value = value[part];
    if (value == null) return value;
  }

  return value;
};

interface NestProps extends VirtualTree.Props {
  diameter: number;

  needCanvasUpdate?(size: Size): void;
  setIsDirty?(): void;
}

export class Nest extends Component<NestProps> {
  private _branchesInTheNest: JSX.Element[] = [];

  private _oldProps: NestProps | null = null;

  protected _needUseCache = true;

  protected get canvasSize(): Size {
    return { width: this.props.diameter * 1.5, height: this.props.diameter * 1.5 };
  }

  protected get _checkProps(): string[] {
    return ['diameter', 'position.x', 'position.y'];
  }

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
    if (!this._propsAreEqual(this.props, props)) {
      if (typeof this.props.setIsDirty === 'function') this.props.setIsDirty();
    }
    this._oldProps = this.props;
    super.applyProps(props);
  }

  private _propsAreEqual(oldProps: NestProps, newProps: NestProps) {
    for (const key of this._checkProps) {
      if (get(oldProps, key) !== get(newProps, key)) return false;
    }

    return true;
  }

  public buildBranches(): void {
    const { diameter } = this.props;

    const x = diameter / 2;
    const y = diameter / 2;

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

  private get _diameterPropDidChanged() {
    if (this._oldProps == null) return true;
    if (this._oldProps.diameter !== this.props.diameter) return true;

    return false;
  }

  public render() {
    if (this._diameterPropDidChanged) {
      if (typeof this.props.needCanvasUpdate === 'function') this.props.needCanvasUpdate(this.canvasSize);
      this.buildBranches();
    }
    return (
      <>
        {this._branchesInTheNest}
      </>
    );
  }
}

export default withIndividualCanvas<NestProps, Nest>(Nest);
