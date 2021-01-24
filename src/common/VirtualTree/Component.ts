import TreeNode from './TreeNode';

export default class Component<TProps extends VirtualTree.Props = VirtualTree.Props> extends TreeNode {
  public static create<GProps extends VirtualTree.Props = VirtualTree.Props>(props: GProps) {
    const instance = new this<GProps>();
    instance.applyProps(props);
    return instance;
  }

  private _props: TProps = {} as TProps;

  public get props() { return this._props; }

  public applyProps(props: TProps): void {
    this._props = props;
    if (props.id != null) this._id = props.id;
  }

  public _render(): VirtualTree.RenderType {
    const renderResult = this.render();
    if (renderResult instanceof Component) return renderResult._render();

    return renderResult as VirtualTree.RenderType;
  }

  public render(): VirtualTree.Element {
    return document.createElement('div');
  }
}

export const isComponentConstructor = (value: unknown): value is typeof Component => (
  // eslint-disable-next-line no-prototype-builtins
  typeof value === 'function' && 'create' in value && Component.isPrototypeOf(value)
);
