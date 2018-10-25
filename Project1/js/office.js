'use strict'

var clock;
var camera;
var scene, renderer;
var switchCamera = 1;
var speed = 0;  //Don't touch this
var maxSpeed = 70;//This is the maximum speed that the object will achieve
var acceleration = 0;
var friction = 1;//How fast will object reach a speed of 0
var chairForward, chairBack, chairLeft, chairRight;
var chair, table, lamp;
var geometry, material, mesh;
var sceneWidth = 80, sceneHeight = 80;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var materials = [];
var movingForward = true;

function onResize() {

    aspect= window.innerWidth / window.innerHeight;

    if (aspect > sceneRatio) {
    		camera.left = -sceneWidth * aspect;
    		camera.right = sceneWidth * aspect;
    		camera.top = sceneHeight;
    		camera.bottom = -sceneHeight;
    }
    else {
    		camera.left = - sceneWidth;
    		camera.right = sceneWidth;
    		camera.top = sceneHeight / aspect;
    		camera.bottom = -sceneHeight / aspect;
    }

  	renderer.setSize(window.innerWidth, window.innerHeight);
  	camera.aspect = aspect;
  	camera.updateProjectionMatrix();
}

function createCamera() {

  aspect= window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(-sceneWidth * aspect, sceneWidth * aspect, sceneHeight, -sceneHeight, -100, 1000);

	camera.position.set(0, 100, 0);
	camera.lookAt(scene.position);
}

function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxisHelper(10) );

  createTable();
  createChair();
  createLamp();
}

function createTable(){

    table = new Table();
    materials.push(table.material);
    scene.add(table);

    table.position.x = 0;
    table.position.y = 0;
    table.position.z = 0;
}

function createChair(){

    chair = new Chair();
    materials.push(chair.material);
    scene.add(chair);

    chair.position.x = 0;
    chair.position.y = 0;
    chair.position.z = -15;
}

function createLamp(){

    lamp = new Lamp();
    materials.push(lamp.material);
    scene.add(lamp);

    lamp.position.x = 50;
    lamp.position.y = 0;
    lamp.position.z = 0;
}


function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:  // left arrow
      chairLeft = false;
      break;
    case 38:  // up arrow
      chairForward = false;
      acceleration = - acceleration/2;
      break;
    case 39:  // right arrow
      chairRight = false;
      break;
    case 40: // down arrow
      chairBack = false;
      acceleration = -acceleration/2;
  }
}

function onKeyDown(e) {

  switch (e.keyCode) {
    case 65:  //A
    case 97: //a
      materials.forEach(function(material) {
        material.wireframe = !material.wireframe;
      });
      break;
    case 49:  // 1
      switchCamera = 1;
      console.log("onKeyDown! Switch to camera: " + switchCamera);
      break;
    case 50:  // 2
      switchCamera = 2;
      console.log("onKeyDown! Switch to camera: " + switchCamera);
      break;
    case 51:  // 3
      switchCamera = 3;
      console.log("onKeyDown! Switch to camera: " + switchCamera);
      break;

    case 37:  // left arrow
      chairLeft = true;
      console.log("onKeyDown! Move Chair: Left");
      break;

    case 38:  // up arrow
      chairForward = true;
      console.log("onKeyDown! Move Chair: Forward");
      break;

    case 39:  // right arrow
      chairRight = true;
      console.log("onKeyDown! Move Chair: Right");
      break;

    case 40:  // down arrow
      chairBack = true;
      console.log("onKeyDown! Move Chair: Down");
      break;
  }
}

function render() {

  renderer.render(scene, camera);
}

function animate() {

  switch (switchCamera) {
    case 1:
      camera.position.x = 50;
      camera.position.y = 0;
      camera.position.z = 0;
      camera.lookAt(scene.position);
      break;

    case 2:
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 120;
      camera.lookAt(scene.position);
      break;

    case 3:
      camera.position.x = 0;
      camera.position.y = 120;
      camera.position.z = 0;
      camera.lookAt(scene.position);
      break;
  }

  if (chairForward) {
    movingForward = true;
    acceleration = 40;
    chair.move();
  }
  if (chairBack) {
    movingForward = false;
    acceleration = -40;
    chair.move();
  }
  if (chairLeft) {
    chair.rotation.y += 0.05;
  }
  if (chairRight) {
    chair.rotation.y -= 0.05;
  }
  if (!(chairForward) && !(chairBack)) {
    chair.stop();
  }

  switchCamera = 0;
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

  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
