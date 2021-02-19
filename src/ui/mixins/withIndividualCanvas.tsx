/* eslint-disable max-classes-per-file */
import { Component, ComponentConstructor } from 'VirtualTree';
import { addPropsToChildren } from '@/common/utils';

export interface PositionProps {
  position: Point;
}

export const withIndividualContext = <TComponent extends typeof Component = typeof Component>(Base: TComponent) => {
  // @ts-ignore
  return class A<TProps extends VirtualTree.Props> extends Base<TProps & PositionProps> {
    protected _canvas: HTMLCanvasElement = document.createElement('canvas');

    protected _ctx = this._canvas.getContext('2d');

    protected _isDirty = true;

    protected _needUseCache = false;

    protected get canvasSize(): Size {
      return { width: 100, height: 100 };
    }

    protected _drawInternalCanvas(ctx: CanvasRenderingContext2D) {
      // @TODO: Add logic for align.
      ctx.drawImage(
        this._canvas,
        this.props.position.x,
        this.props.position.y,
        // ctx.canvas.height - (this._canvas.height + this.props.position.y), // For alignt BottomLeft
      );
    }

    protected _updateCanvasSize(): void {
      const size = this.canvasSize;
      this._canvas.width = size.width;
      this._canvas.height = size.height;
    }

    public beforeMount(): void {
      this._updateCanvasSize();
    }

    public _mount(ctx: CanvasRenderingContext2D): void {
      if (this._ctx == null) throw new Error('Context is incorrect!');

      super._mount(this._ctx);

      this._drawInternalCanvas(ctx);

      if (this._needUseCache) this._isDirty = false;
    }

    public _update(ctx: CanvasRenderingContext2D): void {
      if (this._ctx == null) throw new Error('Context is incorrect!');

      if (this._isDirty) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        super._update(this._ctx);
        if (this._needUseCache) this._isDirty = false;
      }

      this._drawInternalCanvas(ctx);
    }
  };
};

export default class IndividualCanvasComponent extends Component<VirtualTree.Props & PositionProps> {
  protected _canvas: HTMLCanvasElement = document.createElement('canvas');

  protected _ctx = this._canvas.getContext('2d');

  protected _isDirty = true;

  protected _needUseCache = false;

  protected _appliedProps = {
    needCanvasUpdate: (size: Size) => this._updateCanvasSize(size),
    setIsDirty: () => { this._isDirty = true; },
  };

  protected get canvasSize(): Size {
    return { width: 100, height: 100 };
  }

  protected _drawInternalCanvas(ctx: CanvasRenderingContext2D) {
    // @TODO: Add logic for align.
    ctx.drawImage(
      this._canvas,
      this.props.position.x,
      this.props.position.y,
      // ctx.canvas.height - (this._canvas.height + this.props.position.y), // For alignt BottomLeft
    );
  }

  protected _updateCanvasSize(size: Size): void {
    this._canvas.width = size.width;
    this._canvas.height = size.height;
  }

  public beforeMount(): void {
    this._updateCanvasSize(this.canvasSize);

    document.body.append(this._canvas);
  }

  public _mount(ctx: CanvasRenderingContext2D): void {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    super._mount(this._ctx);

    this._drawInternalCanvas(ctx);

    if (this._needUseCache) this._isDirty = false;
  }

  public _update(ctx: CanvasRenderingContext2D): void {
    if (this._ctx == null) throw new Error('Context is incorrect!');

    if (this._isDirty) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      super._update(this._ctx);
      if (this._needUseCache) this._isDirty = false;
    }

    this._drawInternalCanvas(ctx);
  }

  public render() {
    return (
      <>
        {addPropsToChildren(this.props.children, this._appliedProps)}
      </>
    );
  }
}

export const withIndividualCanvas = <
  TProps extends VirtualTree.Props,
  TComponent extends Component<TProps>,
  >(ChildComponent: ComponentConstructor<TProps, TComponent>): ComponentConstructor<TProps & PositionProps> => {
  return class extends Component<TProps & PositionProps> {
    render() {
      return (
        <IndividualCanvasComponent position={this.props.position}>
          <ChildComponent {...this.props} />
        </IndividualCanvasComponent>
      );
    }
  };
};