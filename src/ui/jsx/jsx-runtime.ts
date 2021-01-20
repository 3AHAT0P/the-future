export const jsx = (elementFactory: string | Constructor<any>, props: Record<string, any>, ...children: any[]) => {
  // console.log('JSX', elementFactory, props, children);
  // debugger;
  if (typeof elementFactory === 'string') return elementFactory;
  const instance = new elementFactory(props);
  if (props.children != null) instance.addChild(props.children);
  return instance;
}
export const jsxs = (elementFactory: Constructor<any>, props: Record<string, any>, ...children: any[]) => {
  // console.log('JSXS', elementFactory, props, children);
  // debugger;
  const instance = new elementFactory(props);
  props.children.forEach((child: any) => instance.addChild(child));
  return instance;
}