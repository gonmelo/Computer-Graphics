'use strict'

var clock;
var camera;
var scene, renderer;
var geometry, material, mesh;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var rotateX = 0, rotateY = 0;
var plane;
var sun;
var directionalLight;
var lightingPhong = true;
var calculatingLight = true;
var materials = [];
var headlights = [];


function onResize() {
/*
 * Deals with the resizing of the window so the aspect of the scene is kept, in
 * spite of the window aspect.
 */

  aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  // Needed because of the camera.aspect update
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function createCamera() {
/*
 * Creates a perspective camera pointing at the scene.
 */

  camera = new THREE.PerspectiveCamera(
                           70,
                           window.innerWidth / window.innerHeight,
                           1,
                           1000);
  camera.position.set( 30, 50, 40 );
  camera.lookAt( scene.position );
}


function createScene() {
/*
 * Creates the scene at (0,0,0). Adds axis to it, a sun, creates a airplane
 * and 4 spotlights pointing at the plane.
 */

  scene = new THREE.Scene();
  scene.position.set(0,0,0);
  scene.add( new THREE.AxesHelper(10) );
  createPlane();
  createSpotlights();
  // DirectionalLight(color, intensity)
  sun = new THREE.DirectionalLight(0xeedd82, 1);
  scene.add(sun);
}


function createSpotlights(){
/*
 * Creates the scene at (0,0,0). Adds axis to it, a sun, creates a airplane
 * and 4 spotlights pointing at the plane.
 */

  // SpotLight(x, y, z, angle, axis)
  var spotlight1 = new SpotLight(30, 30, 30, -Math.PI / 4, 1);
  var spotlight2 = new SpotLight(-30, 30, 30, Math.PI / 4, 1);
  var spotlight3 = new SpotLight(30, 30, -30, -Math.PI / 4, 2);
  var spotlight4 = new SpotLight(-30, 30, -30, Math.PI / 4, 2);
  // Add the spotlights to a global vector
  headlights.push(spotlight1.light);
  headlights.push(spotlight2.light);
  headlights.push(spotlight3.light);
  headlights.push(spotlight4.light);
  // Add the spotlights to the scene
  scene.add(spotlight1);
  scene.add(spotlight2);
  scene.add(spotlight3);
  scene.add(spotlight4);
}


function createPlane(x, y, z) {
/*
 * Given a set of coordinates, creates a new airplane and adds it to the scene
 * at the given coordinates.
 */
  plane = new Plane();
  scene.add(plane);
}


function onKeyUp(e) {
/*
 * Callback function for when a key is no longer pressed. Supported keys so far:
 * all arrows to stop rotation in that direction.
 */
  switch (e.keyCode) {
    case 37:  // left arrow
      rotateY = 0;
      break;
    case 38:  // up arrow
      rotateX = 0;
      break;
    case 39:  // right arrow
      rotateY = 0;
      break;
    case 40: // down arrow
      rotateX = 0;
  }
}


function onKeyDown(e) {
/*
 * Callback function for when a key is pressed. Supported keys so far:
 * all arrows to rotate the airplane around an axis; l to enable/disable
 * lighting calculations; g to switch between Phong and Gourard shadowing;
 * n to turn the sun on/off; numbers 1-4 to turn the spotlights on/off.
 */

  switch ( e.keyCode ) {
    // Airplane Movement
    case 37:  // left
      rotateY = 1;
      console.log("onKeyDown! Rotate left");
      break;
    case 38:  // up
      rotateX = 1;
      console.log("onKeyDown! Rotate up");
      break;
    case 39:  // right
      rotateY = 2;
      console.log("onKeyDown! Rotate right");
      break;
    case 40: // down
      rotateX = 2;
      console.log("onKeyDown! Rotate down");
      break;

    // Lighting
    case 108: // l
    case 76: // L
      changeAllBasic();
      console.log(`onKeyDown! changeBasic: ${calculatingLight}`);
      break;
    case 103: // g
    case 71: // G
      changelighting();
      console.log(`onKeyDown! changelighting: ${lightingPhong}`);
      break;

    // Lights
    case 110: // n
    case 78: // N
      sun.visible = !(sun.visible);
      console.log(`onKeyDown! sun: ${sun.visible}`);
      break;
    case 49: // 1
      changespotlight(headlights[0]);
      break;
    case 50: // 2
      changespotlight(headlights[1]);
      break;
    case 51: // 3
      changespotlight(headlights[2]);
      break;
    case 52: // 4
      changespotlight(headlights[3]);
      break;
  }
}


function render() {
  camera.updateProjectionMatrix();
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

function changeAllBasic() {
  if (calculatingLight) {
   plane.changeBasic();
   calculatingLight = false;

  } else if (lightingPhong == false) {
    plane.changeGouraud();
    calculatingLight = true;

  } else if (lightingPhong == true) {
    plane.changePhong();
    calculatingLight = true;
  }
}

function changelighting() {
  if (lightingPhong && calculatingLight == true) {
    plane.changeGouraud();
    lightingPhong = false;

  } else if(lightingPhong == false && calculatingLight == true){
    plane.changePhong();
    lightingPhong = true;
  }
  else if (!calculatingLight){
    if (lightingPhong){
      lightingPhong = false;
    }
    else {
      lightingPhong = true;
    }
  }
}

function changespotlight(spotlight) {
  spotlight.visible = !spotlight.visible;
}


function animate() {
  deltaT = clock.getDelta();

  if (rotateX == 1) {
    plane.rotation.x += 0.05;
  }
  if (rotateX == 2) {
    plane.rotation.x -= 0.05;
  }
  if (rotateY == 1)
  plane.rotation.y += 0.05;
  if (rotateY == 2)
  plane.rotation.y -= 0.05;

  render();
  requestAnimationFrame(animate);
}

function init() {

  clock = new THREE.Clock();
  clock.start();
  renderer = new THREE.WebGLRenderer( { antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight );

  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
