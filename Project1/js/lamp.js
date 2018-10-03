'use strict'

class Lamp extends THREE.Object3D {
  constructor() {
	   super();
     material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
     this.addLampBase(0,0,0);
     this.addLampSupport(0, 1, 0);
     this.addLampAbajour(0, 51, 0);
     this.addLampLight(0, 51, 0);
     this.addLampSphere(0, 54, 0);

  }

  addLampBase(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 12, 12, 1, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+0.5, z);
    this.add(mesh);
  }
  addLampSupport(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 1, 1, 50, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 25.5, z);
    this.add(mesh);
  }
  addLampAbajour(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 5, 10, 12, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 4.5, z);
    this.add(mesh);
  }
  addLampLight(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 2, 0, 4, 25 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+1, z);
    this.add(mesh);
  }
  addLampSphere(x, y, z) {
    var geometry = new THREE.SphereGeometry(2, 26, 5, 0, 6, 0, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+0.5, z);
    this.add(mesh);
  }

}
