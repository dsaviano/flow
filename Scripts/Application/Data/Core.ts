module Data {
    export function checkCollision(one: View.Circle, two: View.Circle) {
        //check for collisions for each circle using Steven's math (Task Two)
        //set velocities and speed
    }
    export function inertia(vx: number, vy: number) {

    }
    export function checkBoundary(circle: View.Circle, height, width) {
        if((circle.x + circle.radius >= width) || (circle.y + circle.radius >= height) || (circle.y - circle.radius <= 0) || (circle.x - circle.radius <= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
    export function reverse(circle: View.Circle) {
        return {
            vx: circle.vx,
            vy: circle.vy
        }
    }
}

