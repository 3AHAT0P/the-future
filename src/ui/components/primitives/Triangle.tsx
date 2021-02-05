import { Component } from 'VirtualTree';

interface TrianglePrimitiveProps extends VirtualTree.Props {
  first: Point;
  second: Point;
  third: Point;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class TrianglePrimitive extends Component<TrianglePrimitiveProps> {
  // public applyProps(props: TrianglePrimitiveProps): void {
  // }

  render(ctx: CanvasRenderingContext2D) {
    const {
      first, second, third, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    ctx.beginPath();

    ctx.moveTo(first.x, ctx.canvas.height - first.y);
    ctx.lineTo(second.x, ctx.canvas.height - second.y);
    ctx.lineTo(third.x, ctx.canvas.height - third.y);

    ctx.closePath();

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
