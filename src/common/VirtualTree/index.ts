export { default as Component, isComponentConstructor, ComponentConstructor } from './Component';
export { default as TreeNode } from './TreeNode';

export const isElementMetaGuard = (value: unknown): value is VirtualTree.ElementMeta => (
  typeof value === 'object' && value != null && 'Factory' in value
);
