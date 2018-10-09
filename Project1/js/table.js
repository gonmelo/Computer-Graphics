'use strict'

class Table extends THREE.Object3D {

  constructor() {
		super();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    this.addTop( 0, 25, 0);
    this.addLegs();
	}

  addLeg(x, y, z, object) {
    var geometry = new THREE.CylinderGeometry( 1.5, 1, 25, 10 );
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 12.5, z);
    mesh.name = "leg";
    object.add(mesh);
  }

  addLegs() {
    var legs = new THREE.Object3D();
    this.addLeg(-25, 0, -8, legs);
    this.addLeg(-25, 0, 8, legs);
    this.addLeg(25, 0, 8, legs);
    this.addLeg(25, 0, -8, legs);
    this.add(legs);
  }

  addTop(x, y, z) {
    var top = new THREE.Object3D();
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 1, z);
    mesh.name = "top";
    top.add(mesh);
    this.add(top);
  }

}
