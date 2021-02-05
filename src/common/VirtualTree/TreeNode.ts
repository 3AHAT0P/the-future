import { v4 as uuidv4 } from 'uuid';

export default class TreeNode {
  protected _id: string = uuidv4();

  protected _parent: this | null = null;

  protected _children: this[] = [];

  public get id() { return this._id; }

  public get parent() { return this._parent; }

  public get children() { return this._children; }

  public detach(from: 'removeChild' | 'attach' | null = null): this {
    if (this._parent != null) {
      const parent = this._parent;
      this._parent = null;
      if (from !== 'removeChild') parent.removeChild(this, 'detach');
    }
    return this;
  }

  public attach(parentNode: this, from: 'addChild' | null = null): this {
    this.detach('attach');
    this._parent = parentNode;
    if (from !== 'addChild') parentNode.addChild(this, 'attach');
    return this;
  }

  public addChild(childNode: this, from: 'removeChild' | 'attach' | null = null): this {
    this._children.push(childNode);
    if (from !== 'attach') childNode.attach(this, 'addChild');
    return this;
  }

  public addChildAfter(prevChildNode: this, childNode: this, from: 'removeChild' | 'attach' | null = null): this {
    const index = this._children.indexOf(prevChildNode);
    if (index === -1) throw new Error('Incorrect prevChildNode');
    this._children.splice(index, 0, childNode);

    return this;
  }

  public removeChild(childNode: this, from: 'detach' | null = null): this {
    if (from !== 'detach') childNode.detach('removeChild');
    const children = [];
    for (const child of this._children) {
      if (child !== childNode) children.push(child);
    }
    this._children = children;
    return this;
  }

  public removeAllChildren(): this {
    for (const child of this._children) child.detach('removeChild');

    this._children = [];
    return this;
  }
}
