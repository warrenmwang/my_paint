class MyPaint {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public canvasTop: number;
  public canvasLeft: number;
  private isDrawing: boolean;
  private prevHovX: number;
  private prevHovY: number;
  private prevColorElement: HTMLElement;

  constructor() {
    const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx === null) throw new Error("ctx null");

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeStyle = "black";
    this.prevColorElement = document.getElementById("black") as HTMLElement;

    this.canvas = canvas;
    this.ctx = ctx;

    const rect = canvas.getBoundingClientRect();
    this.canvasTop = rect.top;
    this.canvasLeft = rect.left;

    this.isDrawing = false;
    this.prevHovX = -1;
    this.prevHovY = -1;

    this.setUpDrawEvents();
    this.setUpColorPickerEvents();
    this.setUpResizeEvents();
    this.setUpClearButton();
  }

  setUpClearButton() {
    const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
    clearBtn.addEventListener("click", () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  setUpResizeEvents() {
    addEventListener("resize", () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvasTop = rect.top;
      this.canvasLeft = rect.left;
    });
  }

  setUpColorPickerEvents() {
    this.prevColorElement.classList.add("selected");

    const palette = document.querySelector(".palette") as HTMLElement;
    palette.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const id = target.id;
      if (!id) return;
      const color = id;

      this.ctx.fillStyle = color;
      this.ctx.strokeStyle = color;
      this.prevColorElement.classList.remove("selected");
      target.classList.add("selected");
      this.prevColorElement = target;
    });
  }

  setUpDrawEvents() {
    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) => {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    };

    const mousedown = (ev: MouseEvent) => {
      this.isDrawing = true;

      const x = Math.trunc(ev.clientX - this.canvasLeft);
      const y = Math.trunc(ev.clientY - this.canvasTop);
      this.ctx.fillRect(x, y, 1, 1);
      this.prevHovX = x;
      this.prevHovY = y;
    };

    const mousemove = (ev: MouseEvent) => {
      if (!this.isDrawing) return;

      const x = Math.trunc(ev.clientX - this.canvasLeft);
      const y = Math.trunc(ev.clientY - this.canvasTop);
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
