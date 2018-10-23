'use strict'

var clock;
var camera, orthographicCamera, perspectiveCamera, stalkerCamera;
var scene, renderer;
var geometry, material, mesh;
var field;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var switchCamera = 0; // default
var materials = [];
var balls   = [];

const timer =  60000;
const maxX  =  2 * Math.sqrt(5) - .6;
const minX  = -2 * Math.sqrt(5) + .6;
const maxZ  =  Math.sqrt(5) - .6;
const minZ  = -Math.sqrt(5) + .6;


function getRandomPoint() {
  // (x, y) between (-3.5, -1.5) and (3.5, 1.5)
  const x = Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5;
  const y = Math.floor(Math.random() * (1.5 + 1.5 + 1)) - 1.5;

  return new Point(x, y);
}

function onResize() {

  aspect = window.innerWidth / window.innerHeight;

  // Resize of ortographic camera
  if ( aspect > sceneRatio ) {
    	orthographicCamera.left   = -sceneWidth * aspect;
    	orthographicCamera.right  = sceneWidth * aspect;
    	orthographicCamera.top    = sceneHeight;
    	orthographicCamera.bottom = -sceneHeight;
  }
  else {
    	orthographicCamera.left   = - sceneWidth;
    	orthographicCamera.right  = sceneWidth;
    	orthographicCamera.top    = sceneHeight / aspect;
    	orthographicCamera.bottom = -sceneHeight / aspect;
  }
  orthographicCamera.updateProjectionMatrix();

  // Resize for perspective camera
  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  // Resize for stalker camera
  stalkerCamera.aspect = aspect;
  stalkerCamera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function createCamera() {
  aspect = window.innerWidth / window.innerHeight;
  orthographicCamera = new THREE.OrthographicCamera(
                            -sceneWidth * aspect,
                            sceneWidth * aspect,
                            sceneHeight,
                            -sceneHeight,
                            -100,
                            1000);

	orthographicCamera.position.set( 0, 1, 0 );
	orthographicCamera.lookAt( scene.position );
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(
                           70,
                           window.innerWidth / window.innerHeight,
                           1,
                           1000);

	perspectiveCamera.position.set( 7, 9, 4 );
	perspectiveCamera.lookAt( scene.position );
}

function createStalkerCamera() {
	stalkerCamera = new THREE.PerspectiveCamera(70,
                       window.innerWidth / window.innerHeight,
                       1,
                       1000);
  // So it follows a ball
	moveStalkerCamera();
}

function moveStalkerCamera() {
  // The chosen ball is irrelevant
  var ball = balls[1];

  // Sets the distance to the ball to give a 3rd person perspective
	stalkerCamera.position.x = ball.position.x - 1.5 * ball.direction.x;
	stalkerCamera.position.y = ball.position.y + 2;
	stalkerCamera.position.z = ball.position.z - 1.5 * ball.direction.z;

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

function createBall( x,y,z ) {
  const ball = new Ball( x, y, z );
  materials.push(ball.material); // For the toggling wireframe feature
  balls.push(ball);
  scene.add(ball);
}

function createBalls() {
  // Create 10 balls
  while ( balls.length < 10 ) {
    var overlaps  = false;  // flag to know if possible position
    var newCenter = getRandomPoint();
    // Check if the new ball will overlap with any existent one
    for (var i = 0; i < balls.length; i++) {
      var distance = Point.distance(balls[i].center, newCenter);
      // If overlapping the ball is not created
      if (distance < 1.2) { // 1.2 > 2 * radius (0.5)
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      createBall(newCenter.x, 1.5, newCenter.y); // 1.5 = base height + radius
    }
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
      console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
      break;
    case 51:  // 3
      switchCamera = 3;
      console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
      break;
  }
}

function moveBalls() {
  // To avoid "changing tabs" bug
  if ( deltaT < 0.1 ) {
    // Check collisions for all pairs of balls
    for(var i = 0; i < balls.length - 1; i++) { // len-1 to compare with the next
      balls[i].seeCollision(i + 1);
    }
    // Move balls according to the collisions
    for(var i = 0; i < balls.length; i++) {
      balls[i].moveB();
    }
  }
}

function render() {
  switch ( switchCamera ) {
    case 1:
      orthographicCamera.position.x = 0;
      orthographicCamera.position.y = 10;
      orthographicCamera.position.z = 0;
      orthographicCamera.updateProjectionMatrix();
      orthographicCamera.lookAt(scene.position);
      renderer.render(scene, orthographicCamera);
      break;

    case 2:
      perspectiveCamera.updateProjectionMatrix();
      perspectiveCamera.lookAt(scene.position);
      renderer.render(scene, perspectiveCamera);
      break;

    case 3:
      stalkerCamera.updateProjectionMatrix();
      renderer.render(scene, stalkerCamera);
      break;
    default:
      renderer.render(scene, orthographicCamera);
  }

}

function levelUp() {
  // Accelerate all balls by the same rate
  for ( var i = 0; i < balls.length; i++ ) {
    balls[i].updateVelocity();
  }
  console.log("Level up!");
  setTimeout(levelUp, timer); // set the time until next level up
}

function animate() {
  deltaT = clock.getDelta();
  moveBalls();
  render();
  requestAnimationFrame(animate);
  moveStalkerCamera();
}

function init() {

  clock = new THREE.Clock();
  clock.start();
  setTimeout(levelUp, timer); // setup for the first level up
  renderer = new THREE.WebGLRenderer( { antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight );

  document.body.appendChild(renderer.domElement);

  createScene();
  createStalkerCamera();
  createPerspectiveCamera();
  createCamera();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
}
