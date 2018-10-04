'use strict'

var camera;
var scene, renderer;
var switchCamera = 1;
var speed = 0;  //Don't touch this
var maxSpeed = 1.5;//This is the maximum speed that the object will achieve
var acceleration = 0.02;//How fast will object reach a maximum speed
var friction = 0.97;//How fast will object reach a speed of 0
var chairForward, chairBack, chairLeft, chairRight;
var direction;
var chair, table, lamp;
var geometry, material, mesh;
var sceneWidth = 120, sceneHeight = 80;
var sceneRatio = sceneWidth / sceneHeight;
var aspect, change;
var materials = [];


function onResize() {

    aspect= window.innerWidth / window.innerHeight;

  if (sceneRatio > aspect) {
  		//var aspect = window.innerHeight / window.innerWidth;
    //  var newScene = sceneAspect * change;
  		camera.left = -sceneWidth /aspect;
  		camera.right =sceneWidth /aspect;
  		camera.top = sceneHeight * aspect;
  		camera.bottom = -sceneHeight * aspect;

  	}
    else{
  	//	var aspect= window.innerWidth / window.innerHeight;

    //  var newScene = sceneAspect * change;
  		camera.left = - sceneWidth;
  		camera.right = sceneWidth;
  		camera.top = aspect * sceneHeight / sceneRatio;
  		camera.bottom = -aspect * sceneHeight / sceneRatio;
  	}

  	renderer.setSize(window.innerWidth, window.innerHeight);

  	camera.aspect = aspect;
  	camera.updateProjectionMatrix();
}

function createCamera() {

//  if (window.innerHeight > window.innerWidth) {
    camera = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight / 8, -100, 1000);
    //originalAspect = window.innerHeight / window.innerWidth;
  //} else {
		//camera = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth  / 8, window.innerHeight / 8, -window.innerHeight / 8, -100, 1000);
    //originalAspect = window.innerWidth / window.innerHeight;
  //}


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
  materials.push(table.material);
  scene.add(table);

  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}

function createChair(x, y, z){
  chair = new Chair();
  materials.push(chair.material);
  scene.add(chair);

  chair.position.x = x;
  chair.position.y = y;
  chair.position.z = z;
}

function createLamp(x, y, z) {
  lamp = new Lamp();
  materials.push(lamp.material);
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
    direction = true;
    chair.move();
  }
  if (chairBack) {
    direction = false;
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
