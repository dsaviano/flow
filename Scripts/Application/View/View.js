/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="Circle.ts" />
/// <reference path="Stage.ts" />
/// <reference path="../Data/QuadTree.ts" />
/// <reference path="../Data/Core.ts" />
var View;
(function (View) {
    View.stage;
    View.tree;
    View.circles;
    function setupView(circleCount, width, height) {
        var canvas = document.getElementById("main");
        View.stage = new View.Stage(0.1, width, height, canvas);
        View.tree = new QuadTree({
            x: 0,
            y: 0,
            width: width,
            height: height
        });
        View.circles = new Array();
        for (var i = 0; i <= circleCount; i++) {
            var circle = new View.Circle(Math.ceil(Math.random() * 10) + 2);
            circle.x = Math.random() * width;
            circle.y = Math.random() * height;
            //
            circle.vx = 20;
            circle.vy = 20;
            //
            circle.graphics.beginFill("#ff0000").drawCircle(circle.x, circle.y, circle.radius);
            View.tree.insert(circle);
            View.stage.addChild(circle);
            View.circles.push(circle);
        }
        View.stage.update();
        View.stage.addEventListener("stagemousemove", mouseMove);
        createjs.Ticker.addEventListener("tick", updateStage);
    }
    View.setupView = setupView;
    function mouseMove(event) {
        for (var i = 0; i < View.circles.length; i++) {
        }
        //View.stage.update(event);
    }
    View.mouseMove = mouseMove;
    function updateStage(event) {
        for (var i = 0; i < View.circles.length; i++) {
            View.circles[i].x += View.circles[i].vx;
            View.circles[i].y += View.circles[i].vy;
            View.circles[i].vx = Math.pow(View.circles[i].vx, 1 / 3);
            View.circles[i].vy = Math.pow(View.circles[i].vy, 1 / 3);
            if (View.circles[i].vx === 1) {
                View.circles[i].vx = 0;
            }
            if (View.circles[i].vy === 1) {
                View.circles[i].vy = 0;
            }
        }
        View.stage.update(event);
    }
    View.updateStage = updateStage;
    function checkCollisions() {
        for (var i = 0; i < View.circles.length; i++) {
            var circle = View.circles[i];
            var array = View.tree.retrieve(circle);
            for (var e = 0; e < array.length; e++) {
                if (Data.checkCollision(View.circles[i], array[e])) {
                }
                else {
                }
            }
        }
    }
    View.checkCollisions = checkCollisions;
})(View || (View = {}));
//# sourceMappingURL=View.js.map