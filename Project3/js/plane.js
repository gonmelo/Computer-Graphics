'use strict'

class Plane extends THREE.Object3D {

	constructor() {
		super();
    this.mainPiecePhongMaterial  = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false });
		this.wingPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false });
		this.cockpitPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: false });

		this.mainPieceBasicMaterial  = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
		this.wingBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
		this.cockpitBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });

		this.mainPieceGouraudMaterial  = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false });
		this.wingGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false });
		this.cockpitGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });
		this.stabilizerGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });

		this.mainPieceMaterial  = this.mainPiecePhongMaterial;
		this.wingMaterial = this.wingPhongMaterial;
		this.cockpitMaterial = this.cockpitPhongMaterial;
		this.stabilizerMaterial = this.stabilizerPhongMaterial;


		this.addCockpit(0, 2.5, 7);


		var mainPiece = new THREE.Object3D();
		var geometry = new THREE.CubeGeometry(6, 5, 30);
		var mesh = new THREE.Mesh(geometry, this.mainPieceMaterial);
		mesh.position.set(0, 0, 0);
		mesh.name = "mainPiece";
		this.mesh1 = new THREE.Mesh();
		this.add(mainPiece);
		this.mesh1.add(mesh);

		var mouth = new THREE.Object3D();
		var geometry = new THREE.CylinderGeometry(0.5, 2.5, 4, 20);
		var mesh6 = new THREE.Mesh(geometry, this.mainPieceMaterial);
		mesh6.position.set(0, 0, 17);
		mesh6.name = "mouth";
		mesh6.rotation.x += Math.PI / 2;
		this.add(mouth);
		this.mesh1.add(mesh6);

		mainPiece.add(this.mesh1);
		mouth.add(this.mesh1);

		this.mesh1.name = "main"

		var wing1 = new THREE.Object3D();
		var geometry1 = new THREE.CubeGeometry(14, 1, 4);
		var mesh1 = new THREE.Mesh(geometry1, this.wingMaterial);
    mesh1.position.set(10, 0, 0);
		mesh1.name = "wing";
		this.mesh2 = new THREE.Mesh();
		this.add(wing1);
		this.mesh2.add(mesh1);

		var wing2 = new THREE.Object3D();
		var geometry2 = new THREE.CubeGeometry(14, 1, 4);
		var mesh2 = new THREE.Mesh(geometry2, this.wingMaterial);
    mesh2.position.set(-10, 0, 0);
		mesh2.name = "wing";
		this.add(wing2);
		this.mesh2.name = "wings";
		this.mesh2.add(mesh2);

		wing1.add(this.mesh2);
		wing2.add(this.mesh2);

		var horizontalStabilizer1 = new THREE.Object3D();
		var geometry3 = new THREE.CubeGeometry(8, 1, 2);
    var mesh3 = new THREE.Mesh(geometry3, this.stabilizerMaterial);
    mesh3.position.set(7, 0, -13);
    mesh3.name = "horizontalStabilizer";
		this.mesh4 = new THREE.Mesh();
		this.add(horizontalStabilizer1);
		this.mesh4.add(mesh3);

		var horizontalStabilizer2 = new THREE.Object3D();
		var geometry4 = new THREE.CubeGeometry(8, 1, 2);
    var mesh4 = new THREE.Mesh(geometry4, this.stabilizerMaterial);
    mesh4.position.set(-7, 0, -13);
    mesh4.name = "horizontalStabilizer";
		this.add(horizontalStabilizer2);
		this.mesh4.add(mesh4);

		var verticalStabilizer = new THREE.Object3D();
		var geometry5 = new THREE.CylinderGeometry(4, 4, 1, 3);
		var mesh5 = new THREE.Mesh(geometry5, this.stabilizerMaterial);
		mesh5.position.set(0, 4.25, -11);
		mesh5.rotation.z += Math.PI / 2;
		mesh5.rotation.x += Math.PI / 6;
		mesh5.name = "verticalStabilizer";
		this.add(verticalStabilizer);
		this.mesh4.add(mesh5);

		horizontalStabilizer1.add(this.mesh4);
		horizontalStabilizer2.add(this.mesh4);
		verticalStabilizer.add(this.mesh4);

		this.mesh4.name = "stabilizers";

}


	addCockpit(x, y, z){
		var cockpit = new THREE.Object3D();
		var geometry = new THREE.SphereGeometry(3, 30, 15, 0, 6.3, 0, 1.6);
    mesh = new THREE.Mesh(geometry, this.cockpitMaterial);
    mesh.position.set(x, y, z);
    mesh.name = "cockpit";
		this.mesh3 = new THREE.Mesh();
		cockpit.add(this.mesh3);
		this.add(cockpit);
		this.mesh3.add(mesh);
	}


	changeBasic(){
		this.mainPieceMaterial  = this.mainPieceBasicMaterial;
		this.wingMaterial = this.wingBasicMaterial;
		this.cockpitMaterial = this.cockpitBasicMaterial;
		this.stabilizerMaterial = this.stabilizerBasicMaterial;

		this.mesh1.children[0].material = this.mainPieceMaterial;
		this.mesh1.children[1].material = this.mainPieceMaterial;
		this.mesh2.children[0].material = this.wingMaterial;
		this.mesh2.children[1].material = this.wingMaterial;
		this.mesh3.children[0].material = this.cockpitMaterial;
		this.mesh4.children[0].material = this.stabilizerMaterial;
		this.mesh4.children[1].material = this.stabilizerMaterial;
		this.mesh4.children[2].material = this.stabilizerMaterial;


	}

	changeGouraud(){
		this.mainPieceMaterial  = this.mainPieceGouraudMaterial;
		this.wingMaterial = this.wingGouraudMaterial;
		this.cockpitMaterial = this.cockpitGouraudMaterial;
		this.stabilizerMaterial = this.stabilizerGouraudMaterial;

		this.mesh1.children[0].material = this.mainPieceMaterial;
		this.mesh1.children[1].material = this.mainPieceMaterial;
		this.mesh2.children[0].material = this.wingMaterial;
		this.mesh2.children[1].material = this.wingMaterial;
		this.mesh3.children[0].material = this.cockpitMaterial;
		this.mesh4.children[0].material = this.stabilizerMaterial;
		this.mesh4.children[1].material = this.stabilizerMaterial;
		this.mesh4.children[2].material = this.stabilizerMaterial;
	}

	changePhong(){
		this.mainPieceMaterial  = this.mainPiecePhongMaterial;
		this.wingMaterial = this.wingPhongMaterial;
		this.cockpitMaterial = this.cockpitPhongMaterial;
		this.stabilizerMaterial = this.stabilizerPhongMaterial;

		this.mesh1.children[0].material = this.mainPieceMaterial;
		this.mesh1.children[1].material = this.mainPieceMaterial;
		this.mesh2.children[0].material = this.wingMaterial;
		this.mesh2.children[1].material = this.wingMaterial;
		this.mesh3.children[0].material = this.cockpitMaterial;
		this.mesh4.children[0].material = this.stabilizerMaterial;
		this.mesh4.children[1].material = this.stabilizerMaterial;
		this.mesh4.children[2].material = this.stabilizerMaterial;
	}
}
