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

[0, 6, 5, 1, 23, 9, 4, 67, 8].forEach((num) => {
    console.log(`deleting ${num} from testTree`);
    // console.log("Before:");
    // prettyPrint(testTree.root);
    testTree.deleteItem(num);
    // console.log("After:");
    // prettyPrint(testTree.root);
})

prettyPrint(testTree.root);

console.log("\nRefresh testTree\n");
testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const callbacks = [
    (value) => {console.log(value)},
    null
];

console.log("Before:");
prettyPrint(testTree.root);

callbacks.forEach((fn) => {
    console.log(`Using ${fn} on testTree in levelOrder`);
    try {
        testTree.levelOrderForEach(fn);
    } catch (error) {
        console.log(error.message);
    }
    console.log("After:");
    prettyPrint(testTree.root);
});

callbacks.forEach((fn) => {
    console.log(`Using ${fn} on testTree in inOrder`);
    try {
        testTree.inOrderForEach(fn);
    } catch (error) {
        console.log(error.message);
    }
    console.log("After:");
    prettyPrint(testTree.root);
});

callbacks.forEach((fn) => {
    console.log(`Using ${fn} on testTree in preOrder`);
    try {
        testTree.preOrderForEach(fn);
    } catch (error) {
        console.log(error.message);
    }
    console.log("After:");
    prettyPrint(testTree.root);
});

callbacks.forEach((fn) => {
    console.log(`Using ${fn} on testTree in postOrder`);
    try {
        testTree.postOrderForEach(fn);
    } catch (error) {
        console.log(error.message);
    }
    console.log("After:");
    prettyPrint(testTree.root);
});


[6, 8, 10].forEach((num) => {
    console.log(`inserting ${num} to testTree`);
    testTree.insert(num);
});

console.log("Testing height() and depth()");
prettyPrint(testTree.root);

[0, 8, 4, 9, 23, 6345].forEach((num)=>{
    console.log(`height(${num}):`, testTree.height(num));
    console.log(`depth(${num}):`, testTree.depth(num));
    console.log("");
})