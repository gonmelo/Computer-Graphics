'use strict'

class Lamp extends THREE.Object3D {
  constructor() {
	   super();
     material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
     this.addLampBase(-30,0,0);
     this.addLampSupport(-30, 1, 0);
     this.addLampAbajour(-30, 51, 0);
     this.addLampLight(-30, 51, 0);
     this.addLampSphere(-30, 53, 0);
  }

  addLampBase(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 12, 12, 1, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.add(mesh);
  }
  addLampSupport(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 1, 1, 50, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 25, z);
    this.add(mesh);
  }
  addLampAbajour(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 5, 10, 12, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 4, z);
    this.add(mesh);
  }
  addLampLight(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 2, 0, 4, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.add(mesh);
  }
  addLampSphere(x, y, z) {
    var geometry = new THREE.SphereGeometry(2, 26, 5, 0, 6, 0, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.add(mesh);
  }

}
