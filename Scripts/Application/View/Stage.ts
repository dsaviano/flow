module View {
    export class Stage extends createjs.Stage {
        force: number;
        constructor(force, width, height, canvas:HTMLElement) {
            super(canvas);
            this.setBounds(0, 0, width, height);
            canvas.setAttribute("height", height);
            canvas.setAttribute("width", width);
        }
    }
} 