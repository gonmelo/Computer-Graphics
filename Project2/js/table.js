'use strict'

var clock;
var camera, perspectiveCamera, stalkerCamera;
var scene, renderer;
var geometry, material, mesh;
var field;
var chairForward, chairBack, chairLeft, chairRight;
var deltaT, deltaX,  deltaAlpha, alpha = 0.05;
var sceneWidth = 10, sceneHeight = 10;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
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

	camera.position.set(0, 1, 0);
	camera.lookAt(scene.position);
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

	perspectiveCamera.position.set(0, 10, 0);
	perspectiveCamera.lookAt(scene.position);
}

function createStalkerCamera() {
	stalkerCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	stalkerCamera.direction = new THREE.Vector3(1, 0, 0);

	moveStalkerCamera();
}

function moveStalkerCamera() {
	stalkerCamera.position.x = ball.position.x - 70 * ball.direction.x;
	stalkerCamera.position.y = ball.position.y + 40;
	stalkerCamera.position.z = ball.position.z - 70 * ball.direction.z;

	stalkerCamera.lookAt(ball.position);
}

function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxisHelper(10) );
  createField();
  createBalls();
}

function createField() {
  field = new Field();
  materials.push(field.material);
  scene.add(field);
}

function createBall(x,y,z) {
  const ball = new Ball(x,y,z);
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
      deltaAlpha = -alpha;
      console.log("onKeyDown! Move Chair: Left");
      break;

    case 38:  // up arrow
      chairForward = true;
      console.log("onKeyDown! Move Chair: Forward");
      break;

    case 39:  // right arrow
      chairRight = true;
      deltaAlpha = alpha;
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

  //window.addEventListener("resize", onResize);
  //window.addEventListener("keydown", onKeyDown);
  //window.addEventListener("keyup", onKeyUp);
}
