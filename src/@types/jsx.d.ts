/* eslint-disable max-classes-per-file */
declare namespace VirtualTree {
  type RenderType = CanvasImageSource | void;

  // eslint-disable-next-line no-use-before-define
  type Element = Component | RenderType;

  interface ElementMeta {
    // eslint-disable-next-line no-use-before-define
    Factory: ComponentConstructor;
    props: Record<string, any>;
    key?: string;
  }

  type ComponentAlign = 'TopLeft' | 'BottomLeft' | 'BottomRight' | 'TopRight';

  interface Props {
    id?: string;
    // eslint-disable-next-line no-use-before-define
    children?: JSX.Element | JSX.Element[];
    key?: string;
    align?: ComponentAlign;
  }

  abstract class TreeNode {
    public get id(): number;

    public get parent(): this | null;

    public get children(): this[];

    detach(from: 'removeChild' | 'attach' | null = null): this;

    attach(parentNode: this, from: 'addChild' | null = null): this;

    addChild(childNode: this, from: 'removeChild' | 'attach' | null = null): this;

    removeChild(childNode: this, from: 'detach' | null = null): this;
  }

  abstract class Component<TProps extends Props = Props> extends TreeNode {
    public get id(): string;

    public get children(): Component[];

    applyProps(props: TProps): void;

    // eslint-disable-next-line no-use-before-define
    render(ctx: CanvasRenderingContext2D): JSX.Element | JSX.Element[];
  }

  interface ComponentConstructor<TProps extends Props = Props> {
    create<
      GProps extends Props = Props,
      >(props: GProps): Component<GProps>;

    new(): Component<TProps>;
  }

  interface FunctionalComponent<TProps extends Props = Props> {
    (props: TProps): Element;
  }
}

declare namespace JSX {
  type Element = VirtualTree.ElementMeta | VirtualTree.RenderType;
  type ElementClass = VirtualTree.Component;
  interface ElementAttributesProperty { props: Props; }
  interface ElementChildrenAttribute { children: JSX.ElementClass[] | JSX.ElementClass; }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IntrinsicElements { }
}
