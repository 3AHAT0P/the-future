import TreeNode from './tree/node';
import TreeHTMLRenderer from './tree/renderers/html';
import { f, x } from './test';

import './styles/index.scss';

// const node = new TreeNode();
// node
//   .addChild(
//     new TreeNode(),
//   )
//   .addChild(
//     new TreeNode()
//       .addChild(
//         new TreeNode(),
//       )
//       .addChild(
//         new TreeNode()
//           .addChild(
//             new TreeNode(),
//           )
//           .addChild(
//             new TreeNode(),
//           ),
//       ),
//     )
//     .addChild(
//       new TreeNode()
//       .addChild(
//         new TreeNode()
//           .addChild(
//             new TreeNode(),
//           )
//           .addChild(
//             new TreeNode()
//               .addChild(
//                 new TreeNode(),
//               ),
//           )
//           .addChild(
//             new TreeNode()
//               .addChild(
//                 new TreeNode(),
//               ),
//           )
//           .addChild(
//             new TreeNode(),
//           )
//         ),
//     )
//     .addChild(
//       new TreeNode()
//         .addChild(
//           new TreeNode()
//             .addChild(
//               new TreeNode(),
//             ).addChild(
//               new TreeNode(),
//             ),
//         )
//         .addChild(
//           new TreeNode(),
//         ),
//     )
//     .addChild(
//       new TreeNode(),
//     );

// document.body.append(nodeRenderToHTML(node));

// const treeHTMLRenderer = new TreeHTMLRenderer({ rootElement: document.body, tree: node });
// treeHTMLRenderer.render();

const treeHTMLRenderer = new TreeHTMLRenderer({ rootElement: document.body, tree: x() as TreeNode });
treeHTMLRenderer.render();

console.log('Hi', f() );

// @ts-ignore
new Worker(window.__meta_main_path);
