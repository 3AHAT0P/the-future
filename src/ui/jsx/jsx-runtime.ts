import { HTMLTreeNode, Props } from "VirtualTree";

type FunctionalComponent = (props: Props) => HTMLTreeNode;
const isFunction = (value: unknown): value is Function => typeof value === 'function' && value.prototype == null;
const isConstructor = <T>(value: unknown): value is Constructor<T> => typeof value === 'function' && value.prototype != null;

class RenderAtom extends HTMLTreeNode<Props> {
  private _render: FunctionalComponent;
  private _props: Props;
  constructor(props: Props, render: FunctionalComponent) {
    super(props);
    this._render = render;
    this._props = props;
  }
  
  render() {
    return this._render(this._props).render();
  }
}

export const jsx = (elementFactory: FunctionalComponent | Constructor<HTMLTreeNode>, props: Record<string, any>, ...children: any[]): HTMLTreeNode | number | string => {
  // console.log('JSX', elementFactory, props, children);
  // debugger;
  // if (typeof elementFactory === 'string') return elementFactory;
  if (isConstructor(elementFactory)) {
    const instance = new elementFactory(props);
    if (props.children != null) instance.addChild(props.children);
    return instance;
  }
  
  const instance = new RenderAtom(props, elementFactory);
  if (props.children != null) instance.addChild(props.children);
  return instance;
}
export const jsxs = (elementFactory: Constructor<HTMLTreeNode>, props: Record<string, any>, ...children: any[]): HTMLTreeNode => {
  // console.log('JSXS', elementFactory, props, children);
  // debugger;
  const instance = new elementFactory(props);
  props.children.forEach((child: any) => instance.addChild(child));
  return instance;
}