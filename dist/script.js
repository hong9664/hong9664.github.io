console.clear();

import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import * as dat from "https://cdn.skypack.dev/dat.gui";

/**s
 * Variables
 */

// Main Settings
const settings = {
  xThreshold: 12,
  yThreshold: 50,
  originalImagePath: "../img/photo10.jpg",
  depthImagePath: "../img/depth10.png",
};

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Image Details
let originalImage = null;
let depthImage = null;
const originalImageDetails = {
  width: 0,
  height: 0,
  aspectRatio: 0,
};

// Geometries and Material
let planeGeometry = null;
let planeMaterial = null;
let plane = null;

// Cursor Settings
const cursor = {
  x: 0,
  y: 0,
  lerpX: 0,
  lerpY: 0,
};

/**
 * Base
 */

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0.7;
scene.add(camera);

let fovY =
  (camera.position.z * camera.getFilmHeight()) / camera.getFocalLength();

/**
 * Images
 */

const textureLoader = new THREE.TextureLoader();

const loadImages = () => {
  if (originalImage !== null || depthImage !== null) {
    originalImage.dispose();
    depthImage.dispose();
  }
  depthImage = textureLoader.load(settings.depthImagePath);

  originalImage = textureLoader.load(
    settings.originalImagePath,
    function (tex) {
      originalImageDetails.width = tex.image.width;
      originalImageDetails.height = tex.image.height;
      originalImageDetails.aspectRatio = tex.image.height / tex.image.width;

      create3dImage();
      resize();
    }
  );
};

loadImages();

/**
 * Create 3D Image
 */

const create3dImage = () => {
  // Cleanup Geometry for GUI
  if (plane !== null) {
    planeGeometry.dispose();
    planeMaterial.dispose();
    scene.remove(plane);
  }

  planeGeometry = new THREE.PlaneBufferGeometry(1, 1);

  planeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      originalTexture: { value: originalImage },
      depthTexture: { value: depthImage },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uThreshold: {
        value: new THREE.Vector2(settings.xThreshold, settings.yThreshold),
      },
    },
    fragmentShader: `
      precision mediump float;
      uniform sampler2D originalTexture; 
      uniform sampler2D depthTexture; 
      uniform vec2 uMouse;
      uniform vec2 uThreshold;

      varying vec2 vUv;

      vec2 mirrored(vec2 v) {
        vec2 m = mod(v,2.);
        return mix(m,2.0 - m, step(1.0 ,m));
      }

      void main() {
        vec4 depthMap = texture2D(depthTexture, mirrored(vUv));
        vec2 fake3d = vec2(vUv.x + (depthMap.r - 0.5) * uMouse.x / uThreshold.x, vUv.y + (depthMap.r - 0.5) * uMouse.y / uThreshold.y);

        gl_FragColor = texture2D(originalTexture,mirrored(fake3d));
      }
    `,
    vertexShader: `
      varying vec2 vUv; 

      void main() {
        vUv = uv; 

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `,
  });

  plane = new THREE.Mesh(planeGeometry, planeMaterial);

  scene.add(plane);
};
create3dImage();

/**
 * Add Settings to GUI
 */

gui
  .add(settings, "originalImagePath", {
    Dog: "https://assets.codepen.io/122136/dog-photo.jpg",
    Girl: "https://assets.codepen.io/122136/girl-photo.jpg",
    Splash: "https://assets.codepen.io/122136/splash-photo.jpg",
  })
  .onFinishChange(loadImages)
  .name("Image");
gui
  .add(settings, "depthImagePath", {
    Dog: "https://assets.codepen.io/122136/dog-depth-map.jpg",
    Girl: "https://assets.codepen.io/122136/girl-depth-map.jpg",
    Splash: "https://assets.codepen.io/122136/splash-depth-map-v1.jpg",
  })
  .onFinishChange(loadImages)
  .name("Depth Map");
gui
  .add(settings, "xThreshold")
  .min(0)
  .max(50)
  .step(1)
  .onFinishChange(loadImages)
  .name("X Threshold");
gui
  .add(settings, "yThreshold")
  .min(0)
  .max(50)
  .step(1)
  .onFinishChange(loadImages)
  .name("Y Threshold");

/**
 * Resize
 */

const resize = () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Image Size
  if (sizes.height / sizes.width < originalImageDetails.aspectRatio) {
    plane.scale.set(
      fovY * camera.aspect,
      (sizes.width / sizes.height) * originalImageDetails.aspectRatio,
      1
    );
  } else {
    plane.scale.set(fovY / originalImageDetails.aspectRatio, fovY, 1);
  }

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", () => {
  resize();
});

/**
 * Cursor
 */

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

window.addEventListener("mouseout", (event) => {
  cursor.x = 0;
  cursor.y = 0;
});
window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  cursor.x = touch.pageX / sizes.width - 0.5;
  cursor.y = touch.pageY / sizes.height - 0.5;
});

window.addEventListener("touchend", (event) => {
  cursor.x = x / 10;
  cursor.y = y / 10;
});

/**모바일 기울기 이벤트 */
// window.addEventListener(
//   "deviceorientation",
//   (event) => {
//     alert("기울기 이벤트 발생");
//     // const x = event.beta; // 디바이스의 x축 기울기
//     // const y = event.gamma; // 디바이스의 y축 기울기

//     // // x, y 값을 이용하여 적절한 움직임을 적용합니다.
//     // // 예를 들어, 아래와 같이 움직일 수 있습니다.
//     // const moveX = x * 2;
//     // const moveY = y * 2;
//     // element.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
//   },
//   true
// );

window.addEventListener(
  "deviceorientation",
  (event) => {
    const x = event.gamma; // 디바이스의 x축 기울기
    const y = event.beta; // 디바이스의 y축 기울기
    const z = event.alpha; // 디바이스의 z축 회전값

    // x, y, z 값을 이용하여 적절한 움직임을 적용합니다.
    // 예를 들어, 아래와 같이 움직일 수 있습니다.
    // cursor.x = x === 0 || x === 90 ? 0 : x > 0 ? -0.5 : 0.5;
    // cursor.y = y === 0 || y === 90 ? 0 : y > 0 ? -0.5 : 0.5;
    cursor.x = x === 0 ? 0 : x / 90;
    cursor.y = y === 0 ? 0 : y / 90;

    // const moveX = x * 2;
    // const moveY = y * 2;
    // const rotateZ = z;
    // element.style.transform =
    //   "translate(" + moveX + "px, " + moveY + "px) rotateZ(" + rotateZ + "deg)";
  },
  true
);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Set Cursor Variables
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;

  cursor.lerpX += (parallaxX - cursor.lerpX) * 5 * deltaTime;
  cursor.lerpY += (parallaxY - cursor.lerpY) * 5 * deltaTime;

  // Mouse Positioning Uniform Values
  planeMaterial.uniforms.uMouse.value = new THREE.Vector2(
    cursor.lerpX,
    cursor.lerpY
  );

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
