import * as THREE from "three";

export default class Trail {
  constructor(size = 256) {
    this.size = size;

    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;

    // Uncomment while debugging
    document.body.appendChild(this.canvas);
    this.canvas.style.position = "fixed";
    this.canvas.style.bottom = "20px";
    this.canvas.style.right = "20px";
    this.canvas.style.width = "256px";
    this.canvas.style.height = "256px";
    this.canvas.style.zIndex = "999999";
    this.canvas.style.border = "1px solid red";
    this.canvas.style.background = "#000";
    // debug block end

    this.ctx = this.canvas.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);

    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, size, size);
  }

  update(pointer) {
    const { ctx, size } = this;

    // Fade previous frame
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(0, 0, size, size);

    ctx.globalCompositeOperation = "lighter";

    const x = pointer.current.x * size;
    const y = (1 - pointer.current.y) * size;

    const pressure = Math.min(pointer.speed * 5000, 1);

    const width = 28 + pressure * 40;
    const height = 28;

    ctx.save();

    ctx.translate(x, y);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width);

    gradient.addColorStop(0.0, "rgba(255,255,255,0.35)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.15)");
    gradient.addColorStop(1.0, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(0, 0, width, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    this.texture.needsUpdate = true;
  }

  destroy() {
    this.texture.dispose();
  }
}
