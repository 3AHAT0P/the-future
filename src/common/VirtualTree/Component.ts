import TreeNode from './TreeNode';

export default class Component<TProps extends VirtualTree.Props = VirtualTree.Props> extends TreeNode {
  public static create<
    GProps extends VirtualTree.Props = VirtualTree.Props,
    >(props: GProps) {
    const instance = new this();
    instance.applyProps(props);
    return instance;
  }

  private _props: TProps = {} as TProps;

  public get props() { return this._props; }

  public applyProps(props: TProps): void {
    this._props = props;
    if (props.id != null) this._id = props.id;
  }

  public _render(ctx: CanvasRenderingContext2D): VirtualTree.RenderType {
    const renderResult = this.render(ctx);
    if (renderResult instanceof Component) return renderResult._render(ctx);
    if (renderResult == null) return void 0;

    // TODO: ??????
    ctx.drawImage(renderResult as CanvasImageSource, 0, 0);
  }

  public render(ctx: CanvasRenderingContext2D): VirtualTree.Element {

  }
}

export const isComponentConstructor = (value: unknown): value is typeof Component => (
  // eslint-disable-next-line no-prototype-builtins
  typeof value === 'function' && 'create' in value && Component.isPrototypeOf(value)
);
