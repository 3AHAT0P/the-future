import { Component } from 'VirtualTree';

interface RoundedLinePrimitiveProps extends VirtualTree.Props {
  radius: number;

  start: Point;
  middle: Point;
  end: Point;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class RoundedLinePrimitive extends Component<RoundedLinePrimitiveProps> {
  render(ctx: CanvasRenderingContext2D) {
    const {
      start, middle, end, radius, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    ctx.beginPath();

    ctx.moveTo(start.x, start.y);
    ctx.arcTo(middle.x, middle.y, end.x, end.y, radius);
    ctx.lineTo(end.x, end.y);

    if (strokeColor != null) {
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    }

    if (fillColor != null) {
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    // Restore the default state
    ctx.restore();
  }
}
