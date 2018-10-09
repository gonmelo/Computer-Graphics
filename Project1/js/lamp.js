'use strict'

class Lamp extends THREE.Object3D {
  constructor() {
	   super();
     this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

     this.addLampBase(0,0,0);
     this.addLampSupport(0, 1, 0);
     this.addHead();
  }

  addLampBase(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 12, 12, 1, 25 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+0.5, z);
    mesh.name = "base";
    this.add(mesh);
  }

  addLampSupport(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 1, 1, 50, 25 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 25, z);
    mesh.name = "support";
    this.add(mesh);
  }

  addAbajour(x, y, z, object) {
    var geometry = new THREE.CylinderGeometry( 5, 10, 12, 25 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 4, z);
    mesh.name = "abajour";
    object.add(mesh);
  }

  addCap(x, y, z, object) {
    var geometry = new THREE.CylinderGeometry( 2, 0, 4, 25 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+1, z);
    mesh.name = "cap";
    object.add(mesh);
  }

  addLightBulb(x, y, z, object) {
    var geometry = new THREE.SphereGeometry(2, 26, 5, 0, 6, 0, 1.5);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y, z);
    mesh.name = "lightBulb";
    object.add(mesh);
  }

  addHead() {
    var head = new THREE.Object3D();
    this.addLightBulb(0, 54, 0, head);
    this.addCap(0, 51, 0, head);
    this.addAbajour(0, 51, 0, head);
    this.add(head);
  }

}
