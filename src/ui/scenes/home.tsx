import { Props, HTMLTreeNode } from 'VirtualTree';

class MyBlockAtom extends HTMLTreeNode<Props> {
  render() {
    const element = document.createElement('div');
    element.className = 'node';
    element.append(this.id.toString());

    const elementChildrenContainer = document.createElement('div');
    elementChildrenContainer.className = 'children';
    element.append(elementChildrenContainer);
    for (const child of this.children) {
      elementChildrenContainer.append(child.render());
    }

    return element;
  }
}

let index = 0;

export default () => (
  <MyBlockAtom id={index++}>
    <MyBlockAtom id={index++}></MyBlockAtom>
    <MyBlockAtom id={index++}>
      <MyBlockAtom id={index++}></MyBlockAtom>
      <MyBlockAtom id={index++}>
        <MyBlockAtom id={index++}></MyBlockAtom>
        <MyBlockAtom id={index++}></MyBlockAtom>
      </MyBlockAtom>
    </MyBlockAtom>
    <MyBlockAtom id={index++}>
      <MyBlockAtom id={index++}>
        <MyBlockAtom id={index++}></MyBlockAtom>
        <MyBlockAtom id={index++}>
          <MyBlockAtom id={index++}></MyBlockAtom>
        </MyBlockAtom>
        <MyBlockAtom id={index++}>
          <MyBlockAtom id={index++}></MyBlockAtom>
        </MyBlockAtom>
        <MyBlockAtom id={index++}></MyBlockAtom>
      </MyBlockAtom>
    </MyBlockAtom>
    <MyBlockAtom id={index++}>
      <MyBlockAtom id={index++}>
        <MyBlockAtom id={index++}></MyBlockAtom>
        <MyBlockAtom id={index++}></MyBlockAtom>
      </MyBlockAtom>
      <MyBlockAtom id={index++}></MyBlockAtom>
    </MyBlockAtom>
    <MyBlockAtom id={index++}></MyBlockAtom>
  </MyBlockAtom>
)