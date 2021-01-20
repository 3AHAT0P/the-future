import TreeNode from './tree/node';

export const f = () => (<div>X</div>);

export const x = (index = 0): any => (
  <TreeNode id={index++}>
    <TreeNode id={index++}></TreeNode>
    <TreeNode id={index++}>
      <TreeNode id={index++}></TreeNode>
      <TreeNode id={index++}>
        <TreeNode id={index++}></TreeNode>
        <TreeNode id={index++}></TreeNode>
      </TreeNode>
    </TreeNode>
    <TreeNode id={index++}>
      <TreeNode id={index++}>
        <TreeNode id={index++}></TreeNode>
        <TreeNode id={index++}>
          <TreeNode id={index++}></TreeNode>
        </TreeNode>
        <TreeNode id={index++}>
          <TreeNode id={index++}></TreeNode>
        </TreeNode>
        <TreeNode id={index++}></TreeNode>
      </TreeNode>
    </TreeNode>
    <TreeNode id={index++}>
      <TreeNode id={index++}>
        <TreeNode id={index++}></TreeNode>
        <TreeNode id={index++}></TreeNode>
      </TreeNode>
      <TreeNode id={index++}></TreeNode>
    </TreeNode>
    <TreeNode id={index++}></TreeNode>
  </TreeNode>
)