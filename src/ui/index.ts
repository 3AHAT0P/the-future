import { Component, isComponentConstructor } from 'VirtualTree';
import App from './app';

import './styles/index.scss';

const render = (rootElementOrSelector: HTMLElement | string, Tree: Constructor<Component>) => {
  let rootElement;
  if (typeof rootElementOrSelector === 'string') {
    const element = document.querySelector(rootElementOrSelector);
    if (element == null) throw new Error('Invalid selector');
    rootElement = element;
  } else rootElement = rootElementOrSelector;
  if (isComponentConstructor(Tree)) {
    const tree: any = Tree.create({});
    if (tree instanceof HTMLElement) rootElement.append(tree);
    else rootElement.append(tree._render());
  }
};

render('#root', App);

// @ts-ignore
new Worker(window.__meta_main_path);
