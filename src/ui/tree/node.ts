let index: number = 0;

export default class TreeNode {
  private _id: number = index++;
  private _parent: TreeNode | null = null;
  private _children: TreeNode[] = [];

  public get id() { return this._id; }
  public get parent() { return this._parent; }
  public get children() { return this._children; }

  constructor({ id }: {id?: number}) {
    if (id != null) this._id = id;
  }

  public detach(from: 'removeChild' | 'attach' | null = null): this {
    if (this._parent != null) {
      const parent = this._parent;
      this._parent = null;
      if (from !== 'removeChild') parent.removeChild(this, 'detach');
    }
    return this;
  }

  public attach(parentNode: TreeNode, from: 'addChild' | null = null): this {
    this.detach('attach');
    this._parent = parentNode;
    if (from !== 'addChild') parentNode.addChild(this, 'attach');
    return this;
  }

  public addChild(childNode: TreeNode, from: 'removeChild' | 'attach' | null = null): this {
    this._children.push(childNode);
    if (from !== 'attach') childNode.attach(this, 'addChild');
    return this;
  }

  public removeChild(childNode: TreeNode, from: 'detach' | null = null): this {
    if (from !== 'detach') childNode.detach('removeChild');
    const children = [];
    for (const child of this._children) {
      if (child !== childNode) children.push(child);
    }
    this._children = children;
    return this;
  }
}