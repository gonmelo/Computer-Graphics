'use strict'

var clock;
var camera, orthographicCamera, perspectiveCamera;
var scene, renderer;
var geometry, material, mesh;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var rotateX = 0, rotateY = 0;
var switchCamera = 0;
var plane;
var sun;
var directionalLight;
var lightingPhong = true;
var calculatingLight = true;


var materials = [];
var headlights = [];


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

	orthographicCamera.position.set( 30, 0, 0 );
	orthographicCamera.lookAt( scene.position );

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000);

	camera.position.set( -20, 5, -12);
	camera.lookAt( scene.position );
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(
                           70,
                           window.innerWidth / window.innerHeight,
                           1,
                           1000);

	perspectiveCamera.position.set( 30, 50, 40 );
	perspectiveCamera.lookAt( scene.position );
}


function createScene() {

  scene = new THREE.Scene();
  scene.position.set(0,0,0);
  scene.add( new THREE.AxesHelper(10) );
  createPlane();

  sun = new THREE.DirectionalLight(0xeedd82, 1);
  sun.position.set(500, 500, 500);
  scene.add(sun);

  createSpotlights();

}

function createSpotlights(){

    var spotlight1 = new SpotLight(30, 30, 30, -Math.PI / 4, 1);
    var spotlight2 = new SpotLight(-30, 30, 30, Math.PI / 4, 1);
    var spotlight3 = new SpotLight(30, 30, -30, -Math.PI / 4, 2);
    var spotlight4 = new SpotLight(-30, 30, -30, Math.PI / 4, 2);
    headlights.push(spotlight1.light);
    headlights.push(spotlight2.light);
    headlights.push(spotlight3.light);
    headlights.push(spotlight4.light);

    scene.add(spotlight1);
    scene.add(spotlight2);
    scene.add(spotlight3);
    scene.add(spotlight4);

}



function createPlane(x, y, z) {
  plane = new Plane();
  /*materials = [...materials,
              plane.mainPieceMaterial,
              plane.wingMaterial,
              plane.cockpitMaterial,
              plane.stabilizerMaterial]; */
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
      rotateY = 0;
      break;
    case 40: // down arrow
      rotateX = 0;
  }
}

function onKeyDown(e) {
  switch ( e.keyCode ) {
/*    case 65:  //A
    case 97: //a
      materials.forEach(function(material) {
        material.wireframe = !material.wireframe;
      });
      break;*/
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
      case 53:  // 1
        switchCamera = 5;
        console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
        break;
      case 54:  // 2
        switchCamera = 6;
        console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
        break;
      case 55:  // 3
        switchCamera = 7;
        console.log(`onKeyDown! Switch to camera: ${switchCamera}`);
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
      case 110: // n
      case 78: // N
        sun.visible = !(sun.visible);
        console.log(`onKeyDown! sun: ${sun.visible}`);
        break;
      case 49: // 1
        changespotlight(headlights[0]);
        break;
      case 50:
        changespotlight(headlights[1]);
        break;
      case 51:
        changespotlight(headlights[2]);
        break;
      case 52:
        changespotlight(headlights[3]);
        break;

  }
}


function render() {
  switch ( switchCamera ) {
      case 5:
        orthographicCamera.updateProjectionMatrix();
        orthographicCamera.lookAt(scene.position);
        renderer.render(scene, orthographicCamera);
        break;
      case 6:
        perspectiveCamera.updateProjectionMatrix();
        perspectiveCamera.lookAt(scene.position);
        renderer.render(scene, perspectiveCamera);
        break;
      case 7:
        camera.updateProjectionMatrix();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        break;
      default:
        perspectiveCamera.updateProjectionMatrix();
        perspectiveCamera.lookAt(scene.position);
        renderer.render(scene, perspectiveCamera);
    }
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

function changespotlight(spotlight){
  spotlight.visible = !spotlight.visible;

}


function animate() {
  deltaT = clock.getDelta();

  if (rotateX == 1){
      plane.rotation.x += 0.05;
  }
  if (rotateX == 2){
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
  createPerspectiveCamera();
  createCamera();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
