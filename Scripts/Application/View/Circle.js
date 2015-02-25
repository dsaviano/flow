/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/createjs-lib/createjs-lib.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var View;
(function (View) {
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(radius) {
            _super.call(this);
            this.radius = radius;
        }
        Circle.prototype.move = function () {
            this.isColliding = false;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x >= View.stage.getBounds().x) {
            }
            if (this.y >= View.stage.getBounds().y) {
            }
            this._draw();
        };
        Circle.prototype.inertia = function () {
            //slow down vx and vy by a certain factor to simulate inertia
        };
        Circle.prototype.setCollision = function (colliding) {
            this.isColliding = colliding;
            this._draw();
        };
        Circle.prototype._draw = function () {
            if (this.isColliding) {
            }
            else {
                View.stage.update();
            }
        };
        return Circle;
    })(createjs.Shape);
    View.Circle = Circle;
})(View || (View = {}));
//# sourceMappingURL=Circle.js.map