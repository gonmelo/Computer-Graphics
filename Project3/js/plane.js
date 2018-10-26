'use strict'

class Plane extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.mainPiecePhongMaterial  = new THREE.MeshPhongMaterial({ color: 0x0000ff, wireframe: false });
		this.wingPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, wireframe: false });
		this.cockpitPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false });

		this.mainPieceBasicMaterial  = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
		this.wingBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
		this.cockpitBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

		this.mainPieceGouraudMaterial  = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: false });
		this.wingGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: false });
		this.cockpitGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false });

		this.mainPieceMaterial  = this.mainPiecePhongMaterial;
		this.wingMaterial = this.wingPhongMaterial;
		this.cockpitMaterial = this.cockpitPhongMaterial;
		this.stabilizerMaterial = this.stabilizerPhongMaterial;


		this.addMainPiece(0,0,0);
		this.addWing(3, 0, 0);
		this.addWing(-17, 0, 0);
		this.addCockpit(0, 2.5, 7);
		this.addHorizontalStabilizer(3, 0, -13);
		this.addHorizontalStabilizer(-11, 0, -13);
		this.addVerticalStabilizer(0, 2.5, -13);
		this.addMouth(0, 0, 15);
	}

	addMainPiece(x, y, z) {
		var mainPiece = new THREE.Object3D();
    var geometry = new THREE.CubeGeometry(6, 5, 30);
    this.mesh1 = new THREE.Mesh(geometry, this.mainPieceMaterial);
    this.mesh1.position.set(x, y, z);
		this.mesh1.name = "mainPiece";
		mainPiece.add(this.mesh1);
		this.add(mainPiece);
	}

	addWing(x, y, z){
		var wing = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(14, 1, 4);
		this.mesh2 = new THREE.Mesh(geometry, this.wingMaterial);
    this.mesh2.position.set(x + 7, y, z);
		this.mesh2.name = "wing";
		wing.add(this.mesh2);
		this.add(wing);
}
	addCockpit(x, y, z){
		var cockpit = new THREE.Object3D();
		var geometry = new THREE.SphereGeometry(3, 30, 15, 0, 6.3, 0, 1.6);
    this.mesh3 = new THREE.Mesh(geometry, this.cockpitMaterial);
    this.mesh3.position.set(x, y, z);
    this.mesh3.name = "cockpit";
		cockpit.add(this.mesh3);
		this.add(cockpit);
	}

	addHorizontalStabilizer(x, y, z){
		var stabilizer = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(8, 1, 2);
    this.mesh4 = new THREE.Mesh(geometry, this.stabilizerMaterial);
    this.mesh4.position.set(x + 4, y, z);
    this.mesh4.name = "stabilizer";
    stabilizer.add(this.mesh4);
		this.add(stabilizer);
	}

	addVerticalStabilizer(x, y, z){
		var stabilizer = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(1, 8, 2);
		this.mesh5 = new THREE.Mesh(geometry, this.stabilizerMaterial);
		this.mesh5.position.set(x, y + 4, z);
		this.mesh5.name = "verticalStabilizer";
		stabilizer.add(this.mesh5);
		this.add(stabilizer);
	}

	addMouth(x, y, z){
		var mouth = new THREE.Object3D();
		var geometry = new THREE.CylinderGeometry(0.5, 2.5, 4, 20);
    this.mesh6 = new THREE.Mesh(geometry, this.mainPieceMaterial);
    this.mesh6.position.set(x, y, z + 2);
    this.mesh6.name = "mouth";
		this.mesh6.rotation.x += Math.PI / 2;
    mouth.add(this.mesh6);
		this.add(mouth);
	}

	changeBasic(){
		this.mainPieceMaterial  = this.mainPieceBasicMaterial;
		this.wingMaterial = this.wingBasicMaterial;
		this.cockpitMaterial = this.cockpitBasicMaterial;
		this.stabilizerMaterial = this.stabilizerBasicMaterial;

		this.mesh1.material = this.mainPieceMaterial;
		this.mesh2.material = this.wingMaterial;
		this.mesh3.material = this.cockpitMaterial;
		this.mesh4.material = this.stabilizerMaterial;
		this.mesh5.material = this.stabilizerMaterial;
		this.mesh6.material = this.mainPieceMaterial;


	}

	changeGouraud(){
		this.mainPieceMaterial  = this.mainPieceGouraudMaterial;
		this.wingMaterial = this.wingGouraudMaterial;
		this.cockpitMaterial = this.cockpitGouraudMaterial;
		this.stabilizerMaterial = this.stabilizerGouraudMaterial;

		this.mesh1.material = this.mainPieceMaterial;
		this.mesh2.material = this.wingMaterial;
		this.mesh3.material = this.cockpitMaterial;
		this.mesh4.material = this.stabilizerMaterial;
		this.mesh5.material = this.stabilizerMaterial;
		this.mesh6.material = this.mainPieceMaterial;
	}

	changePhong(){
		this.mainPieceMaterial  = this.mainPiecePhongMaterial;
		this.wingMaterial = this.wingPhongMaterial;
		this.cockpitMaterial = this.cockpitPhongMaterial;
		this.stabilizerMaterial = this.stabilizerPhongMaterial;

		this.mesh1.material = this.mainPieceMaterial;
		this.mesh2.material = this.wingMaterial;
		this.mesh3.material = this.cockpitMaterial;
		this.mesh4.material = this.stabilizerMaterial;
		this.mesh5.material = this.stabilizerMaterial;
		this.mesh6.material = this.mainPieceMaterial;
	}
}
