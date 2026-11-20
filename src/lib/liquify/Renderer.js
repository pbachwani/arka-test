import * as THREE from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import Pointer from "./Pointer";
import Trail from "./Trail";

export default class Renderer {
  constructor(container) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.pointer = new Pointer();
    this.trail = new Trail();

    this.material = new THREE.ShaderMaterial({
      transparent: true,

      uniforms: {
        uTime: { value: 0 },

        uMouse: {
          value: new THREE.Vector2(),
        },

        uVelocity: {
          value: new THREE.Vector2(),
        },

        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },

        uTrailResolution: {
          value: new THREE.Vector2(256, 256),
        },

        uTrail: {
          value: this.trail.texture,
        },

        uShininess: { value: 64 },

        uLightStrength: { value: 1.0 },

        uLiquidOpacity: { value: 0.18 },
      },

      vertexShader,

      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setClearColor(0x000000, 0);

    this.timer = new THREE.Timer();
    this.timer.connect(document);

    container.appendChild(this.renderer.domElement);

    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);

    window.addEventListener("resize", this.resize);

    this.animate();
  }

  animate() {
    this.frame = requestAnimationFrame(this.animate);

    this.timer.update();

    this.material.uniforms.uTime.value = this.timer.getElapsed();

    this.renderer.render(this.scene, this.camera);

    this.pointer.update();
    this.trail.update(this.pointer);

    this.material.uniforms.uMouse.value.copy(this.pointer.current);

    this.material.uniforms.uVelocity.value.copy(this.pointer.velocity);
  }

  resize() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.material.uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight,
    );
  }

  destroy() {
    cancelAnimationFrame(this.frame);

    window.removeEventListener("resize", this.resize);

    this.pointer.destroy();
    this.trail.destroy();

    this.geometry.dispose();
    this.material.dispose();

    this.renderer.dispose();

    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
