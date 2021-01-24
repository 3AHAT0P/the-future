/* eslint-disable max-classes-per-file */
import { Component } from 'VirtualTree';

class MyBlockAtom extends Component {
  render() {
    const element = document.createElement('div');
    element.className = 'node';
    element.append(this.id);

    const elementChildrenContainer = document.createElement('div');
    elementChildrenContainer.className = 'children';
    element.append(elementChildrenContainer);
    for (const child of this.children) {
      elementChildrenContainer.append(child.render());
    }

    return element;
  }
}

export default class HomeScreen extends Component {
  private _index = 0;

  private getIndex() {
    this._index += 1;
    return this._index.toString();
  }

  public render() {
    return (
      <MyBlockAtom id={this.getIndex()}>
        <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
        <MyBlockAtom id={this.getIndex()}>
          <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
          <MyBlockAtom id={this.getIndex()}>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
          </MyBlockAtom>
        </MyBlockAtom>
        <MyBlockAtom id={this.getIndex()}>
          <MyBlockAtom id={this.getIndex()}>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
            <MyBlockAtom id={this.getIndex()}>
              <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
            </MyBlockAtom>
            <MyBlockAtom id={this.getIndex()}>
              <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
            </MyBlockAtom>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
          </MyBlockAtom>
        </MyBlockAtom>
        <MyBlockAtom id={this.getIndex()}>
          <MyBlockAtom id={this.getIndex()}>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
            <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
          </MyBlockAtom>
          <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
        </MyBlockAtom>
        <MyBlockAtom id={this.getIndex()}></MyBlockAtom>
      </MyBlockAtom>
    );
  }
}
