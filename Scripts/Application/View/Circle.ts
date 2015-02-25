/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/createjs-lib/createjs-lib.d.ts" />

module View {
    export class Circle extends createjs.Shape {
        radius: number;
        isColliding: boolean;
        vx: number;
        vy: number;
        constructor(radius) {
            super();
            this.radius = radius;
        }
        move() {
            this.isColliding = false;
            if (Data.checkBoundary(this, View.height, View.width)) {
                var velocity = Data.reverse(this);
                this.vx = velocity.vx;
                this.vy = velocity.vy;
            }
            this.x += this.vx;
            this.y += this.vy;
        }
        inertia() {
             //slow down vx and vy by a certain factor to simulate inertia
        }
        setCollision(colliding: boolean) {
            this.isColliding = colliding;
        }
    }
} 