'use strict'

class Plane extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.mainPieceMaterial  = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
		this.wingMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
		this.cockpitMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
		this.stabilizerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

		this.addMainPiece(0,0,0);
		this.addWing(4, 0, 0);
		this.addWing(-18, 0, 0);
		this.addCockpit(0, 2.5, 7);
		this.addHorizontalStabilizer(3, 0, -13);
		this.addHorizontalStabilizer(-11, 0, -13);
		this.addVerticalStabilizer(0, 2.5, -13);
	}

	addMainPiece(x, y, z) {
		var mainPiece = new THREE.Object3D();
    var geometry = new THREE.CubeGeometry(6, 5, 30);
    mesh = new THREE.Mesh(geometry, this.mainPieceMaterial);
    mesh.position.set(x, y, z);
		mesh.name = "mainPiece";
    mainPiece.add(mesh);
		this.add(mainPiece);
	}

	addWing(x, y, z){
		var wing = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(14, 1, 4);
		mesh = new THREE.Mesh(geometry, this.wingMaterial);
    mesh.position.set(x + 7, y, z);
		mesh.name = "wing";
    wing.add(mesh);
		this.add(wing);
}
	addCockpit(x, y, z){
		var cockpit = new THREE.Object3D();
		var geometry = new THREE.SphereGeometry(3, 30, 15, 0, 6.3, 0, 1.6);
    mesh = new THREE.Mesh(geometry, this.cockpitMaterial);
    mesh.position.set(x, y, z);
    mesh.name = "cockpit";
    cockpit.add(mesh);
		this.add(cockpit);
	}

	addHorizontalStabilizer(x, y, z){
		var stabilizer = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(8, 1, 2);
    mesh = new THREE.Mesh(geometry, this.stabilizerMaterial);
    mesh.position.set(x + 4, y, z);
    mesh.name = "horizintalStabilizer";
    stabilizer.add(mesh);
		this.add(stabilizer);
	}

	addVerticalStabilizer(x, y, z){
		var stabilizer = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(1, 8, 2);
		mesh = new THREE.Mesh(geometry, this.stabilizerMaterial);
		mesh.position.set(x, y + 4, z);
		mesh.name = "verticalStabilizer";
		stabilizer.add(mesh);
		this.add(stabilizer);
	}
}
