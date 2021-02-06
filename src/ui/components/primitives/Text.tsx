import { Component } from 'VirtualTree';

interface TextPrimitiveProps extends VirtualTree.Props {
  position: Point;
  text: string;

  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string | number;
  fontStretch?: string;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;

  fillColor?: string | CanvasGradient | CanvasPattern;
  strokeColor?: string | CanvasGradient | CanvasPattern;
}

export default class TextPrimitive extends Component<TextPrimitiveProps> {
  private _font = '16px Arial';

  public applyProps(props: TextPrimitiveProps): void {
    super.applyProps(props);

    let font = '';
    if (props.fontStyle != null) font += props.fontStyle;
    if (props.fontVariant != null) font += props.fontVariant;
    if (props.fontWeight != null) font += props.fontWeight;
    if (props.fontStretch != null) font += props.fontStretch;
    if (props.fontSize != null) font += props.fontSize;
    if (props.lineHeight != null) font += props.lineHeight;
    if (props.fontFamily != null) font += props.fontFamily;

    if (font !== '') this._font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    const {
      position, text, fillColor, strokeColor,
    } = this.props;
    ctx.save();

    ctx.font = this._font;

    const textMetrics = ctx.measureText(text);

    const y = ctx.canvas.height - position.y - textMetrics.fontBoundingBoxAscent - textMetrics.fontBoundingBoxDescent;

    if (strokeColor != null) {
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(text, position.x, y);
    }

    if (fillColor != null) {
      ctx.fillStyle = fillColor;
      ctx.fillText(text, position.x, y);
    }

    // Restore the default state
    ctx.restore();
  }
}
