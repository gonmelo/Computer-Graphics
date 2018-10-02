'use strict'

class Table extends THREE.Object3D {

  constructor() {
		super();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    this.addTableTop( 0, 0, 0);
    this.addTableLeg(-25, -1, -8);
    this.addTableLeg(-25, -1, 8);
    this.addTableLeg(25, -1, 8);
    this.addTableLeg(25, -1, -8);
	}

  addTableLeg(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 1.5, 1, 25, 10 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 12.5, z);
    this.add(mesh);
  }

  addTableTop(x, y, z) {
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.add(mesh);
  }
}
