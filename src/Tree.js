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

    deleteItem (value){
        // Delete node with the given value from the tree.
        let targetNode = this.#findNode(value, this.root);
        let parentOfTargetNode = this.#findParentOf(value, this.root);

        // If node is not found, do nothing.
        if (!targetNode) return;

        // Case 1: Node has No Children (Leaf Node)
        if (!targetNode.left && !targetNode.right){
            if (parentOfTargetNode.left === targetNode) {
                parentOfTargetNode.left = null;
            } else {
                parentOfTargetNode.right = null;
            }
        }
        // Case 2: Node has One Child (Left or Right Child)
        if ((targetNode.left && !targetNode.right)
            || (!targetNode.left && targetNode.right)){

            let pointerToTarget = parentOfTargetNode.left === targetNode ?
                "left": "right";
            let pointerToChildOfTarget = targetNode.left ? "left" : "right";
                
            if (pointerToTarget === "left"){
                if (pointerToChildOfTarget === "left"){
                    parentOfTargetNode.left = targetNode.left;
                } else {
                    parentOfTargetNode.left = targetNode.right;
                }
            }
            if (pointerToTarget === "right"){
                if (pointerToChildOfTarget === "left"){
                    parentOfTargetNode.right = targetNode.left;
                } else {
                    parentOfTargetNode.right = targetNode.right;
                }
            }
        }

        // Case 3: Node has Two Children
        if (targetNode.left && targetNode.right){
            // Finding inorder successor: start from the target's right subtree, go left until leaf.
            let inOrderSuccessor = targetNode.right;
            while(inOrderSuccessor.left !== null){
                inOrderSuccessor = inOrderSuccessor.left;
            }

            // Remember the inOrderSuccessor value
            const inOrderSuccessorValue = inOrderSuccessor.data;

            // Delete the inOrderSuccessor's node
            this.deleteItem(inOrderSuccessorValue);

            // Replace the target node's value with the inorder successor
            targetNode.data = inOrderSuccessorValue;            
        }
        

    }

    #findNode(value, node){
        // Returns node with the value. If not found, returns null
        if (!node) return null;
        if (node.data === value) return node;
        if (value < node.data) return this.#findNode(value, node.left);
        if (value > node.data) return this.#findNode(value, node.right);
    }

    #findParentOf(value, node){
        // Returns the parent of the node with the value. If not found, returns null
        const child = this.#findNode(value, this.root);
        if (!child || child === this.root) return null;
        else return this.#findParentOfR(value, this.root);
    }

    #findParentOfR(value, node){
        if (node.left && node.left.data === value) return node;
        if (node.right && node.right.data === value) return node;
        if (value < node.data) return this.#findParentOfR(value, node.left);
        if (value > node.data) return this.#findParentOfR(value, node.right);
    }

    levelOrderForEach(callback) {
        /*
            traverses the tree in breadth-first level order 
            and call the callback function on each value as it traverses, 
            passing each value (not the nodes) as an argument 
            If no callback function is provided, throw an Error
        */
       if (!callback) throw new Error("Tree.levelOrderForEach: callback is falsy");
       let queue = new Array(); // shift and push

       if (!this.root) return;
       queue.push(this.root);
       let currentNode = null;
       while(queue.length){
            currentNode = queue.shift();
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            callback(currentNode.data);
       }       
    }
}