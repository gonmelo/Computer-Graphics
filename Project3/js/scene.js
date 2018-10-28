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
var headLightsON = true;


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

	orthographicCamera.position.set( 0, 6, 50 );
	orthographicCamera.lookAt( scene.position );

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000);

	camera.position.set( -30, 0, -14);
	camera.lookAt( scene.position );
}

function createPerspectiveCamera() {
	perspectiveCamera = new THREE.PerspectiveCamera(
                           70,
                           window.innerWidth / window.innerHeight,
                           1,
                           1000);

	perspectiveCamera.position.set( 30, 40, 25 );
	perspectiveCamera.lookAt( scene.position );
}


function createScene() {

  scene = new THREE.Scene();

  scene.add( new THREE.AxesHelper(10) );
  createPlane();

  sun = new THREE.DirectionalLight(0xeedd82, 1);
  sun.position.set(500, 500, 500);
  sun.castShadow = true;
  scene.add(sun);

  createPointLights();

}

function createPointLights(){

    var pointLight1 = new PointLight(30, 30, 30);
    var pointLight2 = new PointLight(-30, 30, 30);
    var pointLight3 = new PointLight(30, 30, -30);
    var pointLight4 = new PointLight(-35, 30, -30);
    headlights.push(pointLight1.light);
    headlights.push(pointLight2.light);
    headlights.push(pointLight3.light);
    headlights.push(pointLight4.light);

    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);
    scene.add(pointLight4);

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
        changePointlight(headlights[0]);
        break;
      case 50:
        changePointlight(headlights[1]);
        break;
      case 51:
        changePointlight(headlights[2]);
        break;
      case 52:
        changePointlight(headlights[3]);
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

function changePointlight(pointlight){
  pointlight.visible = !pointlight.visible;

}


function animate() {
  deltaT = clock.getDelta();

  if (rotateX == 1){
//    if (Math.cos(plane.rotation.y) > 0)
  //    plane.rotation.x -= 0.05;
//    else
      plane.rotation.x += 0.05;
  }
  if (rotateX == 2){
/*    if (Math.cos(plane.rotation.y) > 0)
      plane.rotation.x += 0.05;
    else */
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
