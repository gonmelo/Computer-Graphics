'use strict'

var clock;
var orthographicCamera, perspectiveCamera, stalkerCamera;
var scene, renderer;
var geometry, material, mesh;
var field;
var deltaT, deltaX,  deltaAlpha, alpha = 0.05;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var switchCamera = 0;
var accel;
var materials = [];
var balls = [];


function getRandomPoint() {
  const x = Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5;
  const y = Math.floor(Math.random() * (1.5 + 1.5 + 1)) - 1.5;

  return new Point(x, y);
}



function onResize() {

  aspect= window.innerWidth / window.innerHeight;

  if (aspect > sceneRatio) {
    	orthographicCamera.left = -sceneWidth * aspect;
    	orthographicCamera.right = sceneWidth * aspect;
    	orthographicCamera.top = sceneHeight;
    	orthographicCamera.bottom = -sceneHeight;
  }
  else {
    	orthographicCamera.left = - sceneWidth;
    	orthographicCamera.right = sceneWidth;
    	orthographicCamera.top = sceneHeight / aspect;
    	orthographicCamera.bottom = -sceneHeight / aspect;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  orthographicCamera.aspect = aspect;
  orthographicCamera.updateProjectionMatrix();
}

function createCamera() {

  aspect= window.innerWidth / window.innerHeight;
  orthographicCamera = new THREE.OrthographicCamera(-sceneWidth * aspect, sceneWidth * aspect, sceneHeight, -sceneHeight, -100, 1000);

	orthographicCamera.position.set(0, 1, 0);
	orthographicCamera.lookAt(scene.position);
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

	perspectiveCamera.position.set(10, 10, 0);
	perspectiveCamera.lookAt(scene.position);
}

function createStalkerCamera() {
	stalkerCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	stalkerCamera.direction = new THREE.Vector3(1, 0, 0);

	//moveStalkerCamera();
}

function moveStalkerCamera() {

  var ball = balls[1];
	stalkerCamera.position.x = ball.position.x - 70 * ball.direction.x;
	stalkerCamera.position.y = ball.position.y + 40;
	stalkerCamera.position.z = ball.position.z - 70 * ball.direction.z;

	stalkerCamera.lookAt(ball.position);
}

function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxesHelper(10) );
  createField();
  createBalls();
}

function createField() {
  field = new Field();
  materials = [...materials, field.baseMaterial, field.wallMaterial];
  scene.add(field);
}

function createBall(x,y,z) {
  const ball = new Ball( x, y, z );
  materials.push(ball.material);
  balls.push(ball);
  scene.add(ball);
}

function createBalls() {
  while (balls.length < 10) {
    var overlaps  = false;  // flag to know if possible position
    var newCenter = getRandomPoint();
    for (var i = 0; i < balls.length; i++) {
      var distance = Point.distance(balls[i].center, newCenter);
      if (distance < 1.2) { // 1.2 > 2 * radius (0.5)
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      createBall(newCenter.x, 1.5, newCenter.y); // 2 = base height + radius
    }
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
    case 69:  // E
    case 101: // e
        balls.forEach(function(ball) {
          var axes= ball.getObjectByName( "axes" );
          axes.visible = !axes.visible;
        });
        console.log(`Axes visibility changed to ${balls[1].getObjectByName( "axes" ).visible}`);
        break;
    case 49:  // 1
      switchCamera = 1;
      console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
      break;
    case 50:  // 2
      switchCamera = 2;
      console.log("onKeyDown! Switch to camera: " + switchCamera);
      break;
    case 51:  // 3
      switchCamera = 3;
      console.log("onKeyDown! Switch to camera: " + switchCamera);
      break;
  }
}

function moveBalls() {
  deltaT = clock.getDelta();
  balls.forEach(function(ball) {
    ball.move(deltaT);
  });
}

function render() {
  renderer.render(scene, orthographicCamera);
}

function animate() {
  switch (switchCamera) {
    case 1:
      orthographicCamera.position.x = 0;
      orthographicCamera.position.y = 10;
      orthographicCamera.position.z = 0;
      orthographicCamera.lookAt(scene.position);
      break;

    case 2:
      perspectiveCamera.lookAt(scene.position);
      break;

    case 3:
      stalkerCamera.lookAt(scene.position);
      break;
  }

  switchCamera = 0;
  moveBalls();
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
  createStalkerCamera();
  createPerspectiveCamera();
  createCamera();

  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  //window.addEventListener("keyup", onKeyUp);
}
