import { Component } from 'VirtualTree';

interface CirclePrimitiveProps extends VirtualTree.Props {
  radius: number;

  center: Point;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class CirclePrimitive extends Component<CirclePrimitiveProps> {
  // public applyProps(props: CirclePrimitiveProps): void {
  // }

  render(ctx: CanvasRenderingContext2D) {
    const {
      center, radius, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    ctx.beginPath();
    ctx.arc(center.x, ctx.canvas.height - center.y, radius, 0, 2 * Math.PI);

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
