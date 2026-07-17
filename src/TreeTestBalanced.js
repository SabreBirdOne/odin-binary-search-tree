import Tree from "./Tree.js";
import {prettyPrint} from "./TreePrettyPrint.js"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomIntegerArray(max, numElements){
    let arr = [];
    for (let i = 0; i < numElements; i++){
        arr.push(getRandomInt(max));
    }
    return arr;
}

const testArr = generateRandomIntegerArray(100, 7);
console.log(`Test Array: ${testArr}`);

let testTree = new Tree(testArr);
prettyPrint(testTree.root);

console.log("isBalanced(): ", testTree.isBalanced());

const printElement = (value) => console.log(value);

console.log("level order");
testTree.levelOrderForEach(printElement);

console.log("pre order");
testTree.preOrderForEach(printElement);

console.log("post order");
testTree.postOrderForEach(printElement);

console.log("in order");
testTree.inOrderForEach(printElement);

[621, 101, 999, 842].forEach((num) => {
    console.log(`inserting ${num} to testTree`);
    testTree.insert(num);
})

prettyPrint(testTree.root);
console.log("isBalanced(): ", testTree.isBalanced());

console.log("Calling Tree.rebalance...");
testTree.rebalance();

prettyPrint(testTree.root);
console.log("isBalanced(): ", testTree.isBalanced());

console.log("level order");
testTree.levelOrderForEach(printElement);

console.log("pre order");
testTree.preOrderForEach(printElement);

console.log("post order");
testTree.postOrderForEach(printElement);

console.log("in order");
testTree.inOrderForEach(printElement);