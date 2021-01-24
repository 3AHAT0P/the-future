/* eslint-disable max-classes-per-file */
declare namespace VirtualTree {
  type RenderType = HTMLElement;

  // eslint-disable-next-line no-use-before-define
  type Element = Component | RenderType;

  interface Props {
    id?: string;
    children?: Element[] | Element;
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

    render(): Element;
  }

  interface FunctionalComponent<TProps extends Props = Props> {
    (props: TProps): Element;
  }
}

declare namespace JSX {
  type Element = VirtualTree.Element;
  type ElementClass = VirtualTree.Component;
  interface ElementAttributesProperty { props: Props; }
  interface ElementChildrenAttribute { children: JSX.Element[] | JSX.Element; }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IntrinsicElements { }
}
