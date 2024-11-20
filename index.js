"use strict";
class MyPaint {
    constructor() {
        const canvas = document.getElementById("mainCanvas");
        const ctx = canvas.getContext("2d");
        if (ctx === null)
            throw new Error("ctx null");
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.strokeStyle = "black";
        this.prevColorElement = document.getElementById("black");
        this.canvas = canvas;
        this.ctx = ctx;
        this.isDrawing = false;
        this.prevHovX = -1;
        this.prevHovY = -1;
        this.setUpDrawEvents();
        this.setUpColorPickerEvents();
        this.setUpClearButton();
    }
    setUpClearButton() {
        const clearBtn = document.querySelector(".clear");
        clearBtn.addEventListener("click", () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }
    setUpColorPickerEvents() {
        this.prevColorElement.classList.add("selected__black");
        const palette = document.querySelector(".palette");
        palette.addEventListener("click", (e) => {
            const target = e.target;
            const id = target.id;
            if (!id)
                return;
            const color = id;
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = color;
            this.prevColorElement.classList.remove(`selected__${this.prevColorElement.id}`);
            target.classList.add(`selected__${color}`);
            this.prevColorElement = target;
        });
    }
    setUpDrawEvents() {
        const drawLine = (startX, startY, endX, endY) => {
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        };
        const mousedown = (ev) => {
            this.isDrawing = true;
            const x = ev.offsetX;
            const y = ev.offsetY;
            this.ctx.fillRect(x, y, 1, 1);
            this.prevHovX = x;
            this.prevHovY = y;
        };
        const mousemove = (ev) => {
            if (!this.isDrawing)
                return;
            const x = ev.offsetX;
            const y = ev.offsetY;
            drawLine(this.prevHovX, this.prevHovY, x, y);
            this.prevHovX = x;
            this.prevHovY = y;
        };
        const mouseup = () => {
            this.isDrawing = false;
        };
        this.canvas.onmousedown = mousedown;
        this.canvas.onmousemove = mousemove;
        this.canvas.onmouseup = mouseup;
    }
}
window.onload = () => {
    new MyPaint();
    console.log("MyPaint initialized.");
};
