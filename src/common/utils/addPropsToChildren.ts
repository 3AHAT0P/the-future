import { isElementMetaGuard } from 'VirtualTree';

export default (children: JSX.Element | JSX.Element[], props: any): JSX.Element | JSX.Element[] => {
  if (children == null) return children;

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (isElementMetaGuard(child)) {
        // eslint-disable-next-line no-param-reassign
        child.props = { ...child.props, ...props };
      }
    });
  } else if (isElementMetaGuard(children)) {
    // eslint-disable-next-line no-param-reassign
    children.props = { ...children.props, ...props };
  }

  return children;
};
