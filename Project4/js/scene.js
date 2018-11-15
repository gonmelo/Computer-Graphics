'use strict'

var clock;
var perspectiveCamera;
var scene, renderer;
var geometry, material, mesh;
var deltaT;
var sceneWidth = 3.8, sceneHeight = 3.8;
var sceneRatio = sceneWidth / sceneHeight;
var aspect;
var rotateX = 0, rotateY = 0;
var board;
//var switchCamera = 0;
var directionalLight;
var pointLight;
var lightingPhong = true;
var calculatingLight = true;


var materials = [];


function onResize() {

  aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function createCamera() {
  aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000);

	perspectiveCamera.position.set( 20, 10, 5);
	perspectiveCamera.lookAt( scene.position );
}



function createScene() {

  scene = new THREE.Scene();
  scene.position.set(0,0,0);
  scene.add( new THREE.AxesHelper(10) );
  createBoard();

  directionalLight = new THREE.DirectionalLight(0xeedd82, 1);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);

  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 10, 0);

  scene.add(pointLight);

}


function createBoard(x, y, z) {
  board = new Board();
  /*materials = [...materials,
              plane.mainPieceMaterial,
              plane.wingMaterial,
              plane.cockpitMaterial,
              plane.stabilizerMaterial]; */
  scene.add(board);
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
      console.log(`onKeyDown! sun: ${pointLight.visible}`);
  }
}


function render() {
    perspectiveCamera.updateProjectionMatrix();
    perspectiveCamera.lookAt(scene.position);
    renderer.render(scene, perspectiveCamera);
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

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}
