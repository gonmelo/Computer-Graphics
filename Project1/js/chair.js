'use strict'

class Chair extends THREE.Object3D {
	constructor() {
		super();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    this.addChairBack(0, 1, -10);
    this.addChairSit(0, 0, 0);
    this.addChairSupport(0, -1, 0);

    this.addChairLeg1(-1, -16, 0);
    this.addChairLeg1(9, -16, 0);
    this.addChairLeg2(0, -16, -1);
    this.addChairLeg2(0, -16, 9);

    this.addChairWheel(-9, -16, 1);
    this.addChairWheel(7, -16, 1);
    this.addChairWheel(-1, -16, 9);
    this.addChairWheel(-1, -16, -7);
	}

  addChairSit(x, y, z) {
    geometry = new THREE.CubeGeometry(20, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.add(mesh);
  }
  addChairSupport(x, y, z) {
    var geometry = new THREE.CubeGeometry( 2, 15, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y-7.5, z);
    this.add(mesh);
  }
  addChairLeg1(x, y, z) {
    var geometry = new THREE.CubeGeometry(8, 3, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 4, y+1.5, z);
    this.add(mesh);
  }
  addChairLeg2(x, y, z) {
    var geometry = new THREE.CubeGeometry(1, 3, 8);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+1.5, z - 4);
    this.add(mesh);
  }
  addChairWheel(obj, x, y, z) {
    geometry = new THREE.TorusGeometry(1, 1, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 1, y-2, z-1);
    mesh.rotation.y += Math.PI / 2;
    this.add(mesh);
  }
  addChairBack(x, y, z) {
    geometry = new THREE.CubeGeometry(20, 20, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+10, z+1);
    this.add(mesh);
  }

}
