'use strict'

class Table extends THREE.Object3D {

  constructor() {
		super();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    this.addTableTop( 0, 25, 0);
    this.addTableLeg(-25, 0, -8);
    this.addTableLeg(-25, 0, 8);
    this.addTableLeg(25, 0, 8);
    this.addTableLeg(25, 0, -8);
	}

  addTableLeg(x, y, z) {
    var geometry = new THREE.CylinderGeometry( 1.5, 1, 25, 10 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 12.5, z);
    mesh.name = "tableLeg";
    this.add(mesh);
  }

  addTableTop(x, y, z) {
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 1, z);
    mesh.name = "tableTop";
    this.add(mesh);
  }
}
