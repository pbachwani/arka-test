import * as THREE from "three";

export default class Pointer {
  constructor() {
    this.target = new THREE.Vector2(0.5, 0.5);
    this.current = new THREE.Vector2(0.5, 0.5);
    this.previous = new THREE.Vector2(0.5, 0.5);

    this.velocity = new THREE.Vector2();

    this.onMove = this.onMove.bind(this);

    window.addEventListener("pointermove", this.onMove);
  }

  onMove(e) {
    this.target.set(
      e.clientX / window.innerWidth,
      1 - e.clientY / window.innerHeight,
    );
  }

  update() {
    this.previous.copy(this.current);

    this.current.lerp(this.target, 0.12);

    this.velocity.copy(this.current).sub(this.previous);

    this.speed = this.velocity.length();

    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
  }

  destroy() {
    window.removeEventListener("pointermove", this.onMove);
  }
}
