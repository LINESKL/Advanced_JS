import { FlyweightTree } from "./FlyweightTree.js";

class TreeFactory {
    constructor() {
        this.trees = new Map();
        this.treeCount = 0;
    }

    getTree(type, species, foliageColor, trunkColor, height, width) {
        const key = `${type}-${species}-${foliageColor}-${trunkColor}-${height}-${width}`;

        if (!this.trees.has(key)) {
            const tree = new FlyweightTree(type, species, foliageColor, trunkColor, height, width);
            this.trees.set(key, tree);
            console.log(`[Factory] Создан новый легковес: ${species}`);
        } else {
            console.log(`[Factory] Повторное использование легковеса: ${species}`);
        }

        this.treeCount++;
        return this.trees.get(key);
    }

    getStats() {
        return {
            totalTrees: this.treeCount,
            uniqueFlyweights: this.trees.size,
            memorySaved: Math.round((1 - this.trees.size / this.treeCount) * 100) + "%"
        };
    }
}

const treeFactory = new TreeFactory();
export default treeFactory;