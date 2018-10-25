'use strict'

var clock;
var orthographicCamera, perspectiveCamera;
var scene, renderer;
var geometry, material, mesh;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var rotateX = 0, rotateY = 0;
var switchCamera = 0;
var plane;

var materials = [];


function onResize() {

  aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function createCamera() {
  aspect = window.innerWidth / window.innerHeight;
  orthographicCamera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000);

	orthographicCamera.position.set( 0, 6, 50 );
	orthographicCamera.lookAt( scene.position );
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(
                           70,
                           window.innerWidth / window.innerHeight,
                           1,
                           1000);

	perspectiveCamera.position.set( 30, 40, 30 );
	perspectiveCamera.lookAt( scene.position );
}


function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxesHelper(10) );
  createPlane();
}


function createPlane( x,y,z ) {
  plane = new Plane(0,0,0);
  materials = [...materials, plane.mainPieceMaterial, plane.wingMaterial, plane.cockpitMaterial];
  scene.add(plane);
}

function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:  // left arrow
      rotateY = 0;
      break;
    case 38:  // up arrow
      rotateX = 0;
      break;
    case 39:  // right arrow
      rotateX = 0;
      break;
    case 40: // down arrow
      rotateY = 0;
  }
}

function onKeyDown(e) {
  switch ( e.keyCode ) {
    case 65:  //A
    case 97: //a
      materials.forEach(function(material) {
        material.wireframe = !material.wireframe;
      });
      break;
    case 37:  // left
      rotateY = 1;
      console.log(`onKeyDown! Rotate left: ${switchCamera}`);
      break;
    case 38:  // up
      rotateX = 1;
      console.log(`onKeyDown! Rotate up: ${switchCamera}`);
      break;
    case 39:  // right
      rotateY = 2;
      console.log(`onKeyDown! Rotate right: ${switchCamera}`);
      break;
    case 40: // down
      rotateX = 2;
      console.log(`onKeyDown! Rotate down: ${switchCamera}`);
      break;
      case 49:  // 1
        switchCamera = 1;
        console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
        break;
      case 50:  // 2
        switchCamera = 2;
        console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
        break;
  }
}


function render() {
  switch ( switchCamera ) {
      case 1:

        orthographicCamera.updateProjectionMatrix();
        orthographicCamera.lookAt(scene.position);
        renderer.render(scene, orthographicCamera);
        break;

      case 2:
        perspectiveCamera.updateProjectionMatrix();
        perspectiveCamera.lookAt(scene.position);
        renderer.render(scene, perspectiveCamera);
        break;

      default:
        renderer.render(scene, perspectiveCamera);
    }
  }



function animate() {
  deltaT = clock.getDelta();

  if (rotateX == 1)
      plane.rotation.x -= 0.05;
  if (rotateX == 2)
      plane.rotation.x += 0.05;
  if (rotateY == 1)
      plane.rotation.y += 0.05;
  if (rotateY == 2)
      plane.rotation.y -= 0.05;
  //rotateX = 0;
  //rotateY = 0;
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
  createPerspectiveCamera();
  createCamera();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
