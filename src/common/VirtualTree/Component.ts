import TreeNode from './TreeNode';

export default class Component<TProps extends VirtualTree.Props = VirtualTree.Props> extends TreeNode {
  public static create<
    GProps extends VirtualTree.Props = VirtualTree.Props,
    >(props: GProps) {
    const instance = new this();
    instance.applyProps(props);
    return instance;
  }

  protected _align: VirtualTree.ComponentAlign = 'TopLeft';

  private _props: TProps = {} as TProps;

  public get props() { return this._props; }

  public applyProps(props: TProps): void {
    this._props = props;
    if (props.id != null) this._id = props.id;
    if (props.align != null) this._align = props.align;
    if (props.children != null) {
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this, props.children);
      // debugger;
      // if (Array.isArray(props.children)) {
      //   props.children.forEach((child: this) => this.addChild(child));
      // }
    }
  }

  public beforeMount(): void {
    // noop
  }

  public handleClick(event: MouseEvent) {
    for (const child of this._children) {
      child.handleClick(event);
    }
  }

  public _mount(ctx: CanvasRenderingContext2D): void {
    this.beforeMount();

    const renderResult = this.render(ctx);

    if (renderResult == null) return;

    if ('Factory' in renderResult) {
      const child = renderResult.Factory.create(renderResult.props) as unknown as this;
      this.addChild(child);
      child._mount(ctx);
      return;
    }

    if (Array.isArray(renderResult)) {
      for (const meta of renderResult) {
        if (meta instanceof Object && 'Factory' in meta) {
          const child = meta.Factory.create(meta.props) as unknown as this;
          this.addChild(child);
          child._mount(ctx);
        }
      }
      return;
    }

    // TODO: ?????? это вообще тут нужно?
    ctx.drawImage(renderResult as CanvasImageSource, 0, 0);
  }

  public _update(ctx: CanvasRenderingContext2D): void {
    const renderResult = this.render(ctx);

    if (renderResult == null) return;

    if ('Factory' in renderResult) {
      if (this.children.length === 1 && this.children[0] instanceof renderResult.Factory) {
        this.children[0].applyProps(renderResult.props as unknown as TProps);
        this.children[0]._update(ctx);
      } else {
        this.removeAllChildren();
        const child = renderResult.Factory.create(renderResult.props) as unknown as this;
        this.addChild(child);
        child._mount(ctx);
      }
      return;
    }

    if (Array.isArray(renderResult)) {
      for (let index = 0; index < renderResult.length; index += 1) {
        const meta = renderResult[index];
        const _child = this._children[index];

        if (!(meta instanceof Object && 'Factory' in meta)) {
          if (_child != null) this.removeChild(_child);
          // eslint-disable-next-line no-continue
          continue;
        }

        if (_child != null) {
          if (_child instanceof meta.Factory) {
            _child.applyProps(meta.props as unknown as TProps);
            _child._update(ctx);
          } else {
            const child = meta.Factory.create(meta.props) as unknown as this;
            this.addChildAfter(_child, child);
            this.removeChild(_child);
            child._mount(ctx);
          }
        } else {
          const child = meta.Factory.create(meta.props) as unknown as this;
          this.addChild(child);
          child._mount(ctx);
        }
      }
      if (this._children.length > renderResult.length) {
        this._children = this._children.slice(0, renderResult.length);
      }
      return;
    }

    // TODO: ??????
    ctx.drawImage(renderResult as CanvasImageSource, 0, 0);
  }

  public render(ctx: CanvasRenderingContext2D): JSX.Element | JSX.Element[] {
  // noop
  }
}

export const isComponentConstructor = (value: unknown): value is typeof Component => (
  // eslint-disable-next-line no-prototype-builtins
  typeof value === 'function' && 'create' in value && Component.isPrototypeOf(value)
);
