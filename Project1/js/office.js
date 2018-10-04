'use strict'

var camera;
var scene, renderer;
var switchCamera = 1;
var speed = 0.1;  //Don't touch this
var maxSpeed = 10;//This is the maximum speed that the object will achieve
var acceleration = 10;//How fast will object reach a maximum speed
var deceleration = 10;//How fast will object reach a speed of 0
var chairForward, chairBack, chairLeft, chairRight;
var chair, table, lamp;
var geometry, material, mesh;
var materials = [];

function onResize() {
  if (window.innerHeight > window.innerWidth) {
  		var aspectRatio = window.innerWidth / window.innerHeight;
  		camera.left = originalAspect *-window.innerWidth / 8;
  		camera.right = originalAspect * window.innerWidth / 8;
  		camera.top = originalAspect * window.innerHeight / 8;
  		camera.bottom = originalAspect* -window.innerHeight / 8;

  	} else {
  		var aspectRatio = window.innerHeight / window.innerWidth;
  		camera.left = originalAspect * -window.innerWidth / 8;
  		camera.right = originalAspect * window.innerWidth  / 8;
  		camera.top = originalAspect * window.innerHeight / 8;
  		camera.bottom = originalAspect * -window.innerHeight / 8;
  	}

  	renderer.setSize(window.innerWidth, window.innerHeight);

  	camera.aspect = aspectRatio;
  	camera.updateProjectionMatrix();
}

function createCamera() {
  var aspectRatio = window.innerHeight / window.innerWidth;
  if (window.innerHeight > window.innerWidth) {
		camera = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight / 8, -100, 1000);
	} else {
		camera = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth  / 8, window.innerHeight / 8, -window.innerHeight / 8, -100, 1000);
	}

	camera.position.set(50, 0, 0);
	camera.lookAt(scene.position);
}

function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxisHelper(10) );

  createTable(0, 0, 0);
  createChair(0, 0, -40);
  createLamp(50,0,0);
}

function createTable(x, y, z) {
  table = new Table();
  scene.add(table);

  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}

function createChair(x, y, z){
  chair = new Chair();
  chair.userData = {
    vx: 0, vy: 0,
    ax: 0, ay: 0,
    r: 0
  };

  scene.add(chair);

  chair.position.x = x;
  chair.position.y = y;
  chair.position.z = z;
}

function createLamp(x, y, z) {
  lamp = new Lamp();

  scene.add(lamp);

  lamp.position.x = x;
  lamp.position.y = y;
  lamp.position.z = z;
}

function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:  // left arrow
      chairLeft = false;
      break;
    case 38:  // up arrow
      chairForward = false;
      break;
    case 39:  // right arrow
      chairRight = false;
      break;
    case 40: // down arrow
      chairBack = false;
  }
}

function onKeyDown(e) {

  switch (e.keyCode) {
    case 65:  //A
    case 97: //a
      console.log(materials);
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

    case 71: camera.position.x +=3; render(); camera.lookAt(scene.position); break;
    case 66: camera.position.x -=3; render(); camera.lookAt(scene.position); break;
    case 72: camera.position.y +=3; render(); camera.lookAt(scene.position); break;
    case 78: camera.position.y -=3; render(); camera.lookAt(scene.position); break;
    case 74: camera.position.z +=3; render(); camera.lookAt(scene.position); break;
    case 77: camera.position.z -=3; render(); camera.lookAt(scene.position); break;
  }
}

function updatePosition(obj) {
  // update velocity
  obj.vx += obj.ax;
  obj.vy += obj.ay;

  // friction
  obj.vx *= obj.vx;
  obj.vy *= obj.vy;

  // update position
  obj.x += obj.vx;
  obj.y += obj.vy;
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
    chair.position.x += (Math.sin(chair.rotation.y));
    chair.position.z += (Math.cos(chair.rotation.y));
  }
  if (chairBack) {
    chair.position.x -= (Math.sin(chair.rotation.y));
    chair.position.z -= (Math.cos(chair.rotation.y));
  }
  if (chairLeft) {
    chair.rotation.y += 0.05;
  }
  if (chairRight) {
    chair.rotation.y -= 0.05;
  }

  updatePosition(chair);
  switchCamera = 0;
  render();
  requestAnimationFrame(animate);
}


function init() {

  renderer = new THREE.WebGLRenderer( { antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight );

  var clock = new THREE.Clock(true);
	clock.start();

  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();

  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
