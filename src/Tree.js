import Node from "./Node.js";

export default class Tree {
    #buildTree (arr, start, end){
        if (start > end) return null;
        else {
            const mid = Math.floor(start + (end - start) / 2);
            let newRoot = new Node(arr[mid]);
            this.size++;
            newRoot.left = this.#buildTree(arr, start, mid - 1);
            newRoot.right = this.#buildTree(arr, mid + 1, end);
            return newRoot;            
        }
    }

    #buildTreeStarter (arr){
        const sortedArr = [...new Set(arr.toSorted((a, b) => a - b))];
        return this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }

    constructor (startArray = []){
        this.size = 0;
        this.root = this.#buildTreeStarter(startArray);
    }

    includes (target){
        // Returns true if the given value is in the tree, else returns false 
        return this.#includesR(target, this.root);
    }

    #includesR (target, node){
        if (!node) return false;
        return (node.data === target)
            || this.#includesR(target, node.left)
            || this.#includesR(target, node.right);
    }

    insert (value){
        // inserts a new node with given value into the tree.
        // if value already exists in the tree, do nothing.
        this.#insert(value, this.root);
    }

    #insert (value, node){
        // insert value into subtree, rooted at node.
        if (value === node.data) return;
        if (value < node.data){
            if (!node.left) {
                node.left = new Node(value);
                return;
            }
            this.#insert(value, node.left);
        }
        else {
            if (!node.right) {
                node.right = new Node(value);
                return;
            }
            this.#insert(value, node.right);
        }
    }
}