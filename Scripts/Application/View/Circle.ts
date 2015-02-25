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
            this.x += this.vx;
            this.y += this.vy;
            if (this.x >= View.stage.getBounds().x) {
                //reverse vx
            }
            if (this.y >= View.stage.getBounds().y) {
                //reverse vy
            }
           
            this._draw();
        }
        inertia() {
             //slow down vx and vy by a certain factor to simulate inertia
        }
        setCollision(colliding: boolean) {
            this.isColliding = colliding;
            this._draw();
        }
        _draw() {            
            if (this.isColliding) {
                //handle collision
            }
            else {
                View.stage.update();
            }
        }
    }
} 