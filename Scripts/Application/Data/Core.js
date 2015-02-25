var Data;
(function (Data) {
    function checkCollision(one, two) {
        //check for collisions for each circle using Steven's math (Task Two)
        //set velocities and speed
    }
    Data.checkCollision = checkCollision;
    function inertia(vx, vy) {
    }
    Data.inertia = inertia;
    function checkBoundary(circle, height, width) {
        if ((circle.x + circle.radius >= width) || (circle.y + circle.radius >= height) || (circle.y - circle.radius <= 0) || (circle.x - circle.radius <= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
    Data.checkBoundary = checkBoundary;
    function reverse(circle) {
        return {
            vx: circle.vx,
            vy: circle.vy
        };
    }
    Data.reverse = reverse;
})(Data || (Data = {}));
//# sourceMappingURL=Core.js.map