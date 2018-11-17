'use strict'

var clock;
var camera, controls;
var scene, renderer;
var controls;
var geometry, material, mesh;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var speed = 0;  //Don't touch this
var maxSpeed = 10;//This is the maximum speed that the object will achieve
var acceleration = 1;
var board, ball, magicMike;
var directionalLight;
var pointLight;
var lightingPhong = true;
var calculatingLight = true;
var stopped = false;
var moveBall = 0;
var pauseGame;
var ballCenter;

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


function stopAnimation() {
	stopped = !stopped;
	clock.running ? clock.stop() : clock.start();
}


function createScene() {

  scene = new THREE.Scene();
  scene.position.set(0,0,0);
  scene.add( new THREE.AxesHelper(10) );
  createBoard();
  createMagicMike();
  createBall();

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 0, 2);
  pointLight.position.set(0, 30, 0);
  scene.add(pointLight);

  pauseGame = new Pause();
  scene.add(pauseGame);
}


function createBoard() {
  var bM = new THREE.MeshBasicMaterial( {
		map:
		visible: true
	} );
  board = new Board();
  scene.add(board);
}


function createBall() {
  ball = new Ball();
  scene.add(ball);
  ballCenter.add( ball.mesh);
}


function createMagicMike() {
  magicMike = new MagicMike();
  scene.add(magicMike);

  ballCenter = new THREE.Group();
	magicMike.mesh.add( ballCenter );
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
    case 115:
        pause();
    break;
    case 82: // R
    case 114: // r
      if(stopped){

      }
    break;
    case 66: //B
    case 98: //b
      if (moveBall == 0 || moveBall == 2){
        moveBall = 1;
      }
      else {
        moveBall = 2;
      }
      console.log(`onKeyDown! ball: ${moveBall}`);
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

function pause() {
	stopAnimation();
  pauseGame.visible = !pauseGame.visible;
  controls.autoRotate =  !controls.autoRotate;
  controls.update();
  if (pauseGame.visible) {
    pauseGame.mesh.position.set((camera.position.x - scene.position.x)/2, (camera.position.y - scene.position.y)/2, (camera.position.z - scene.position.z)/2);
    pauseGame.mesh.lookAt(camera.position);
  }
}

function animate() {

  if (moveBall == 1) {
    ball.move(acceleration);
  }
  else if (moveBall == 2) {
    ball.move(-acceleration);
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

}
