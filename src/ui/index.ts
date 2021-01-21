import App from './app';

import './styles/index.scss';

const render = (rootElementOrSelector: HTMLElement | string, tree: JSX.Element) => {
  let rootElement;
  if (typeof rootElementOrSelector === 'string') {
    const element = document.querySelector(rootElementOrSelector);
    if (element == null) throw new Error('Invalid selector');
    rootElement = element;
  } else rootElement = rootElementOrSelector;
  rootElement.append(tree.render());
}

render('#root', App());

// @ts-ignore
new Worker(window.__meta_main_path);
