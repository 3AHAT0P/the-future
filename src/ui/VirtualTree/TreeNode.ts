import Props from "./Props";

export let index: number = 0;

export default abstract class TreeNode<TProps extends Props = Props, TRenderReturn = void> {
  protected _id: number = index++;
  protected _parent: this | null = null;
  protected _children: this[] = [];

  public get id() { return this._id; }
  public get parent() { return this._parent; }
  public get children() { return this._children; }

  constructor({ id }: TProps) {
    if (id != null)
      this._id = id;
  }

  public detach(from: 'removeChild' | 'attach' | null = null): this {
    if (this._parent != null) {
      const parent = this._parent;
      this._parent = null;
      if (from !== 'removeChild')
        parent.removeChild(this, 'detach');
    }
    return this;
  }

  public attach(parentNode: this, from: 'addChild' | null = null): this {
    this.detach('attach');
    this._parent = parentNode;
    if (from !== 'addChild')
      parentNode.addChild(this, 'attach');
    return this;
  }

  public addChild(childNode: this, from: 'removeChild' | 'attach' | null = null): this {
    this._children.push(childNode);
    if (from !== 'attach')
      childNode.attach(this, 'addChild');
    return this;
  }

  public removeChild(childNode: this, from: 'detach' | null = null): this {
    if (from !== 'detach')
      childNode.detach('removeChild');
    const children = [];
    for (const child of this._children) {
      if (child !== childNode)
        children.push(child);
    }
    this._children = children;
    return this;
  }

  public abstract render(): TRenderReturn;
}
