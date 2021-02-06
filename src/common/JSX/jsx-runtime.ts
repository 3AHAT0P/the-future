export const Fragment = Symbol('Fragment');

export const jsx = (
  Factory: VirtualTree.ComponentConstructor | typeof Fragment,
  props: Record<string, any>,
  key?: string,
): VirtualTree.ElementMeta => {
  // eslint-disable-next-line no-param-reassign
  // props.children = props.children.flat();
  if (Factory === Fragment) return props.children;

  return {
    Factory,
    props,
    key,
  };
};

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
