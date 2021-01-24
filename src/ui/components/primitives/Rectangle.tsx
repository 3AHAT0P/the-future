import { Component } from 'VirtualTree';

interface RectanglePrimitiveProps extends VirtualTree.Props {
  width: number;
  height: number;

  left: number;
  bottom: number;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class RectanglePrimitive extends Component<RectanglePrimitiveProps> {
  // public applyProps(props: RectanglePrimitiveProps): void {
  // }

  render(ctx: CanvasRenderingContext2D) {
    const {
      width, height, left, bottom, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    if (strokeColor != null) ctx.strokeStyle = strokeColor;
    if (fillColor != null) ctx.fillStyle = fillColor;

    ctx.strokeRect(left, ctx.canvas.height - (height + bottom), width, height);

    // Restore the default state
    ctx.restore();
  }
}
