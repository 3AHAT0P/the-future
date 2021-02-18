import { Component } from 'VirtualTree';

interface RectanglePrimitiveProps extends VirtualTree.Props {
  width: number;
  height: number;

  position: Point;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class RectanglePrimitive extends Component<RectanglePrimitiveProps> {
  // public applyProps(props: RectanglePrimitiveProps): void {
  // }

  render(ctx: CanvasRenderingContext2D) {
    const {
      width, height, position, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    ctx.beginPath();

    ctx.rect(position.x, position.y, width, height);

    if (strokeColor != null) {
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    }

    if (fillColor != null) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    // Restore the default state
    ctx.restore();
  }
}
