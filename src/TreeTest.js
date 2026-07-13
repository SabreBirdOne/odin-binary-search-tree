import Tree from "./Tree.js";
import {prettyPrint} from "./TreePrettyPrint.js"

let testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(testTree.root)
console.log("Tree size:", testTree.size);

console.log("testTree.includes(3)? ", testTree.includes(3));
console.log("testTree.includes(621)? ", testTree.includes(621));

[6, 8, 10].forEach((num) => {
    console.log(`inserting ${num} to testTree`);
    testTree.insert(num);
});

// prettyPrint(testTree.root);

[0, 6, 5, 4, 8].forEach((num) => {
    console.log(`deleting ${num} from testTree`);
    testTree.deleteItem(num);
})

prettyPrint(testTree.root);