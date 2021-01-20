import TreeNode from '@/ui/tree/node';

export default class TreeHTMLRenderer {
  private _rootElement: HTMLElement = document.body;
  private _tree: TreeNode;

  private _createNodeElement(node: TreeNode): HTMLElement {
    const element = document.createElement('div');
    element.className = 'node';
    element.append(node.id.toString());
    return element;
  }

  private _createChildrenContainer(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'children';
    return element;
  }

  private _renderNode(node: TreeNode): HTMLElement {
    const element = this._createNodeElement(node);
    const elementChildrenContainer = this._createChildrenContainer();
    element.append(elementChildrenContainer);
    for (const child of node.children) {
      elementChildrenContainer.append(this._renderNode(child));
    }
    return element;
  }

  constructor({ rootElement, tree }: { rootElement: HTMLElement, tree: TreeNode }) {
    this._rootElement = rootElement;
    this._tree = tree;
  }

  public render() {
    const element = this._renderNode(this._tree);
    this._rootElement.append(element);
  }
}