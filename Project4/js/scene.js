'use strict'

var clock;
var camera, controls;
var scene, renderer;
var controls;
var geometry, material, mesh;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var speed = 0;  //Don't touch this
var maxSpeed = 20;//This is the maximum speed that the object will achieve
var acceleration = 2;
var rotateX = 0, rotateY = 0;
var board, ball, magicMike;
var directionalLight;
var pointLight;
var lightingPhong = true;
var calculatingLight = true;
var stopped = false;
var moveBall = 0;

var materials = [];


function onResize() {

  aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  controls.update();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function createCamera() {
  aspect = window.innerWidth / window.innerHeight;

  camera = new THREE.PerspectiveCamera (
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000);
	camera.position.set(40, 30, 5);
	camera.lookAt( scene.position );
}


function pauseGame() {
	stopAnimaton();
}

function restartPaused() {

}

function stopAnimaton() {
	stopped = !stopped;
	clock.running ? clock.stop() : clock.start();
}


function createScene() {

  scene = new THREE.Scene();
  scene.position.set(0,0,0);
  scene.add( new THREE.AxesHelper(10) );
  createBoard();
  createBall();
  createMagicMike();

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);

  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-10, 10, -10);
  scene.add(pointLight);

}


function createBoard() {
  board = new Board();
  /*materials = [...materials,
              plane.mainPieceMaterial,
              plane.wingMaterial,
              plane.cockpitMaterial,
              plane.stabilizerMaterial]; */
  scene.add(board);
}


function createBall() {
  ball = new Ball();
  scene.add(ball);
}


function createMagicMike() {
  magicMike = new MagicMike();
  scene.add(magicMike);
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
      rotateY = 0;
      break;
    case 40: // down arrow
      rotateX = 0;
  }
}

function onKeyDown(e) {
  switch ( e.keyCode ) {
    case 87:  //W
    case 119: // w
      materials.forEach(function(material) {
        material.wireframe = !material.wireframe;
      });
    break;
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
    case 100: // d
    case 68: // D
      directionalLight.visible = !(directionalLight.visible);
      console.log(`onKeyDown! sun: ${directionalLight.visible}`);
    break;
    case 80: //P
    case 112: // p
      pointLight.visible = !(pointLight.visible);
      console.log(`onKeyDown! point: ${pointLight.visible}`);
    break;
    case 83: // S
        pauseGame();
    break;
    case 82: // R
        restartPaused();
    break;
    case 66: //B
    case 98: //b
      if (moveBall == 0){
        moveBall = 1;
      }
      else {
        moveBall = 2;
      }
    break;
  }
}


function render() {
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
  }


function changeAllBasic() {
  if (calculatingLight) {
  	board.changeBasic();
  	calculatingLight = false;
  }
}


function animate() {

  if (moveBall == 1) {
    ball.move(acceleration);
  }
  else if (moveBall == 2) {
    ball.move(-acceleration);
  }

  if (speed == 0){
    moveBall = 0;
    acceleration = 2;
  }

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
  controls = new THREE.OrbitControls( camera );
  controls.autoRotate = true;

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
