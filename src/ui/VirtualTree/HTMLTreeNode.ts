import Props from "./Props";
import TreeNode from "./TreeNode";

export default abstract class HTMLTreeNode<TProps extends Props = Props> extends TreeNode<TProps, HTMLElement> { }
