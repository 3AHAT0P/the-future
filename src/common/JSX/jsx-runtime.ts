import { Component } from 'VirtualTree';

export const Fragment = Symbol('Fragment');

// export const jsx = (
//   ElementFactory: typeof Component,
//   props: Record<string, any>,
//   key?: string,
// ): Component => {
//   console.log('----', ElementFactory, props, key);
//   const instance = ElementFactory.create(props);
//   if (props.children != null) instance.addChild(props.children);
//   return instance;
// };

// export const jsxs = (
//   ElementFactory: typeof Component | typeof Fragment,
//   props: Record<string, any>,
//   key?: string,
// ): Component => {
//   console.log('----', ElementFactory, props, key);
//   // eslint-disable-next-line no-param-reassign
//   props.children = props.children.flat();
//   if (ElementFactory === Fragment) return props.children;
//   const instance = ElementFactory.create(props);
//   props.children.forEach((child: Component) => instance.addChild(child));
//   return instance;
// };

export const jsx = (
  Factory: VirtualTree.ComponentConstructor,
  props: Record<string, any>,
  key?: string,
): VirtualTree.ElementMeta => ({
  Factory,
  props,
  key,
});

export const jsxs = (
  Factory: VirtualTree.ComponentConstructor | typeof Fragment,
  props: Record<string, any>,
  key?: string,
): VirtualTree.ElementMeta => {
  // eslint-disable-next-line no-param-reassign
  props.children = props.children.flat();
  if (Factory === Fragment) return props.children;

  return {
    Factory,
    props,
    key,
  };
};
