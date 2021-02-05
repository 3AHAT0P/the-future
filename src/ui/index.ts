import { Component } from 'VirtualTree';

import App from './app';

import './styles/index.scss';

const render = (rootElementOrSelector: HTMLCanvasElement | string, Tree: typeof App) => {
  let rootElement: HTMLCanvasElement;
  if (typeof rootElementOrSelector === 'string') {
    const element = document.querySelector(rootElementOrSelector);
    if (element == null || !(element instanceof HTMLCanvasElement)) throw new Error('Invalid selector');
    rootElement = element;
  } else rootElement = rootElementOrSelector;
  rootElement.setAttribute('width', rootElement.clientWidth.toString());
  rootElement.setAttribute('height', rootElement.clientHeight.toString());
  const tree = Tree.create({ canvas: rootElement });
  tree._mount();
  setInterval(() => tree._update(), 1000 / 30);
};

render('#root', App);

// @ts-ignore
new Worker(window.__meta_main_path);
