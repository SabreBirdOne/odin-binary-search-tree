import Node from "./Node.js";

export default class Tree {
    #buildTree(arr, start, end){
        if (start > end) return null;
        else {
            const mid = Math.floor(start + (end - start) / 2);
            let newRoot = new Node(arr[mid]);
            newRoot.left = this.#buildTree(arr, start, mid - 1);
            newRoot.right = this.#buildTree(arr, mid + 1, end);
            return newRoot;            
        }
    }

    #buildTreeStarter(arr){
        const sortedArr = [...new Set(arr.toSorted((a, b) => a - b))];
        return this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }

    constructor(startArray = []){
        this.size = 0;
        this.root = this.#buildTreeStarter(startArray);
    }
}