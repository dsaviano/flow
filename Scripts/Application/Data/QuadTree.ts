class QuadTree {
    bounds: any;
    pointQuad: any;
    maxDepth: any;
    maxChildren: any;
    root: any = null;
    constructor(bounds, pointQuad?, maxDepth?, maxChildren?) {
        var node;
        if (pointQuad) {
            node = new QNode(bounds, 0, maxDepth, maxChildren);
        } else {
            node = new BoundsNode(bounds, 0, maxDepth, maxChildren);
        }
        if (maxDepth) {
            this.maxDepth = maxDepth;
        }
        if (maxChildren) {
            this.maxChildren = maxChildren;
        }
        this.root = node;
    }
    insert(item) {
        if (item instanceof Array) {
            var len = item.length;

            var i;
            for (i = 0; i < len; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    }
    clear() {
        this.root.clear();
    }
    retrieve(item) {
        var out = this.root.retrieve(item).slice(0);
        return out;
    }
}
class QNode {
    _bounds: any = null;
    children: any = null;
    nodes: any = null;
    _maxChildren: any = 4;
    _maxDepth: any = 4;
    _depth: any = 0;
    _classConstructor: any = QNode;
    static TOP_LEFT: any = 0;
    static TOP_RIGHT: any = 1;
    static BOTTOM_LEFT: any = 2;
    static BOTTOM_RIGHT: any = 3;
    constructor(bounds: any, depth: any, maxDepth: any, maxChildren: any) {
        this._bounds = bounds;
        this.children = [];
        this.nodes = [];
        if (maxChildren) {
            this._maxChildren = maxChildren;
        }
        if (maxDepth) {
            this._maxDepth = maxDepth;
        }
        if (depth) {
            this._depth = depth;
        }
    }
    insert(item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            this.nodes[index].insert(item);

            return;
        }

        this.children.push(item);

        var len = this.children.length;
        if (!(this._depth >= this._maxDepth) &&
            len > this._maxChildren) {

            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    }
    retrieve(item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            return this.nodes[index].retrieve(item);
        }

        return this.children;
    }
    _findIndex(item) {
        var b = this._bounds;
        var left = (item.x > b.x + b.width / 2) ? false : true;
        var top = (item.y > b.y + b.height / 2) ? false : true;

        //top left
        var index = QNode.TOP_LEFT;
        if (left) {
            //left side
            if (!top) {
                //bottom left
                index = QNode.BOTTOM_LEFT;
            }
        } else {
            //right side
            if (top) {
                //top right
                index = QNode.TOP_RIGHT;
            } else {
                //bottom right
                index = QNode.BOTTOM_RIGHT;
            }
        }

        return index;
    }
    subdivide() {
        var depth = this._depth + 1;

        var bx = this._bounds.x;
        var by = this._bounds.y;

        //floor the values
        var b_w_h = (this._bounds.width / 2) | 0; //todo: Math.floor?
        var b_h_h = (this._bounds.height / 2) | 0;
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;

        //top left
        this.nodes[QNode.TOP_LEFT] = new this._classConstructor({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //top right
        this.nodes[QNode.TOP_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //bottom left
        this.nodes[QNode.BOTTOM_LEFT] = new this._classConstructor({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);


        //bottom right
        this.nodes[QNode.BOTTOM_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);
    }
    clear() {
        this.children.length = 0;

        var len = this.nodes.length;

        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    }
}

class BoundsNode extends QNode {
    _classConstructor = BoundsNode;
    _stuckChildren = null;
    _out = [];
    constructor(bounds: any, depth: any, maxChildren: any, maxDepth: any) {
        super(bounds, depth, maxChildren, maxDepth);
        QNode.call(this, bounds, depth, maxChildren, maxDepth);
        this._stuckChildren = [];
    }
    insert(item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            //todo: make _bounds bounds
            if (item.x >= node._bounds.x &&
                item.x + item.width <= node._bounds.x + node._bounds.width &&
                item.y >= node._bounds.y &&
                item.y + item.height <= node._bounds.y + node._bounds.height) {

                this.nodes[index].insert(item);

            } else {
                this._stuckChildren.push(item);
            }

            return;
        }

        this.children.push(item);

        var len = this.children.length;

        if (!(this._depth >= this._maxDepth) &&
            len > this._maxChildren) {

            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    }
    getChildren() {
        return this.children.concat(this._stuckChildren);
    }
    retrieve(item) {
        var out = this._out;
        out.length = 0;
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            if (item.x >= node._bounds.x &&
                item.x + item.width <= node._bounds.x + node._bounds.width &&
                item.y >= node._bounds.y &&
                item.y + item.height <= node._bounds.y + node._bounds.height) {

                out.push.apply(out, this.nodes[index].retrieve(item));
            } else {
                //Part of the item are overlapping multiple child nodes. For each of the overlapping nodes, return all containing objects.

                if (item.x <= this.nodes[QNode.TOP_RIGHT]._bounds.x) {
                    if (item.y <= this.nodes[QNode.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[QNode.TOP_LEFT].getAllContent());
                    }

                    if (item.y + item.height > this.nodes[QNode.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[QNode.BOTTOM_LEFT].getAllContent());
                    }
                }

                if (item.x + item.width > this.nodes[QNode.TOP_RIGHT]._bounds.x) {//position+width bigger than middle x
                    if (item.y <= this.nodes[QNode.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[QNode.TOP_RIGHT].getAllContent());
                    }

                    if (item.y + item.height > this.nodes[QNode.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[QNode.BOTTOM_RIGHT].getAllContent());
                    }
                }
            }
        }

        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);

        return out;
    }
    getAllContent() {
        var out = this._out;
        if (this.nodes.length) {

            var i;
            for (i = 0; i < this.nodes.length; i++) {
                this.nodes[i].getAllContent();
            }
        }
        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);
        return out;
    }
    clear() {

        this._stuckChildren.length = 0;

        //array
        this.children.length = 0;

        var len = this.nodes.length;

        if (!len) {
            return;
        }

        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        //array
        this.nodes.length = 0;

        //we could call the super clear function but for now, im just going to inline it
        //call the hidden super.clear, and make sure its called with this = this instance
        //Object.getPrototypeOf(BoundsNode.prototype).clear.call(this);
    }
}

