import treeFactory from "../tree/TreeFactory.js";

export class ForestRender {
  constructor() {
    this.canvas = document.getElementById("canvasId");
    this.ctx = this.canvas.getContext("2d");
    this.trees = [];
  }

  addTree(
    x,
    y,
    type,
    species,
    foliageColor,
    trunkColor,
    height,
    width,
    scale,
    rotation,
  ) {
    const flyweight = treeFactory.getTree(
      type,
      species,
      foliageColor,
      trunkColor,
      height,
      width,
    );
    this.trees.push({ flyweight, x, y, scale, rotation });
  }

  generateForest(count = 10000) {
    const types = ["Oak", "Pine", "Birch"];
    const speciesMap = {
      Oak: { foliage: "#228B22", trunk: "#8B4513", height: 80, width: 30 },
      Pine: { foliage: "#32CD32", trunk: "#D2691E", height: 100, width: 20 },
      Birch: { foliage: "#90EE90", trunk: "#DEB887", height: 60, width: 25 },
    };

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const config = speciesMap[type];
      this.addTree(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        type,
        type.charAt(0).toUpperCase() + type.slice(1),
        config.foliage,
        config.trunk,
        config.height,
        config.width,
        0.5 + Math.random(), // scale
        Math.random() * Math.PI, // rotation
      );
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const tree of this.trees) {
      tree.flyweight.render(
        this.ctx,
        tree.x,
        tree.y,
        tree.scale,
        tree.rotation,
      );
    }
    return treeFactory.getStats();
  }
}
