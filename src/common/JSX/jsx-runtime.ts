import { TreeNode, Component } from 'VirtualTree';

export const jsx = (ElementFactory: typeof Component, props: Record<string, any>): TreeNode => {
  const instance = ElementFactory.create(props);
  if (props.children != null) instance.addChild(props.children);
  return instance;
};

export const jsxs = (ElementFactory: typeof Component, props: Record<string, any>): TreeNode => {
  const instance = ElementFactory.create(props);
  props.children.forEach((child: Component) => instance.addChild(child));
  return instance;
};
