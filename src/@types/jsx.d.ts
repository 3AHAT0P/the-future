

declare module VirtualTree {
  interface Props {
    id?: number;
  }

  abstract class TreeNode<TProps extends Props = Props, TRenderReturn = void> {
    // protected _id: number;
    // protected _parent: this | null;
    // protected _children: this[];

    public get id(): number;
    public get parent(): this | null;
    public get children(): this[];

    // constructor(props: TProps);

    detach(from: 'removeChild' | 'attach' | null = null): this;

    attach(parentNode: this, from: 'addChild' | null = null): this;

    addChild(childNode: this, from: 'removeChild' | 'attach' | null = null): this;

    removeChild(childNode: this, from: 'detach' | null = null): this;

    render(): TRenderReturn;
  }


  abstract class HTMLTreeNode<TProps extends Props = Props> extends TreeNode<TProps, HTMLElement> { }
}

declare module JSX {
  type Element = VirtualTree.HTMLTreeNode;
  type ElementClass = VirtualTree.HTMLTreeNode;
  // interface ElementAttributesProperty { props: {}; }
  // interface ElementChildrenAttribute { children: {}; }

  interface IntrinsicElements { }
}