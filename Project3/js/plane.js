'use strict'

class Plane extends THREE.Object3D {

	constructor() {
		super();
    this.mainPiecePhongMaterial  = new THREE.MeshPhongMaterial({ color: 0x904B00, wireframe: false , side: THREE.DoubleSide});
		this.wingPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xDD2590, wireframe: false , side: THREE.DoubleSide});
		this.cockpitPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x0125990, wireframe: false , side: THREE.DoubleSide});
		this.stabilizerPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x2B9B2E, wireframe: false, side: THREE.DoubleSide });

		this.mainPieceBasicMaterial  = new THREE.MeshBasicMaterial({ color: 0x904B00, wireframe: false , side: THREE.DoubleSide});
		this.wingBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xDD2590, wireframe: false , side: THREE.DoubleSide});
		this.cockpitBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x125990, wireframe: false , side: THREE.DoubleSide});
		this.stabilizerBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x2B9B2E, wireframe: false, side: THREE.DoubleSide });

		this.mainPieceGouraudMaterial  = new THREE.MeshLambertMaterial({ color: 0x904B00, wireframe: false , side: THREE.DoubleSide});
		this.wingGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0xDD2590, wireframe: false , side: THREE.DoubleSide});
		this.cockpitGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x125990, wireframe: false , side: THREE.DoubleSide});
		this.stabilizerGouraudMaterial = new THREE.MeshLambertMaterial({ color: 0x2B9B2E, wireframe: false , side: THREE.DoubleSide});

		this.mainPieceMaterial  = this.mainPiecePhongMaterial;
		this.wingMaterial = this.wingPhongMaterial;
		this.cockpitMaterial = this.cockpitPhongMaterial;
		this.stabilizerMaterial = this.stabilizerPhongMaterial;


		this.geometry1 = new THREE.Geometry();

		this.geometry1.vertices.push(

			new THREE.Vector3(3, 0, 3),
			new THREE.Vector3(3, 0, -3),
			new THREE.Vector3(3, 5, 3),
			new THREE.Vector3(3, 5, -3),

			new THREE.Vector3(3, 5, 9),
			new THREE.Vector3(3, 0, 9),
			new THREE.Vector3(3, 5, 15),
			new THREE.Vector3(3, 0, 15),

			new THREE.Vector3(3, 5, -9),
			new THREE.Vector3(3, 0, -9),
			new THREE.Vector3(3, 5, -15),
			new THREE.Vector3(3, 0, -15),

			new THREE.Vector3(-3, 0, 3),
			new THREE.Vector3(-3, 0, -3),
			new THREE.Vector3(-3, 5, 3),
			new THREE.Vector3(-3, 5, -3),

			new THREE.Vector3(-3, 5, 9),
			new THREE.Vector3(-3, 0, 9),
			new THREE.Vector3(-3, 5, 15),
			new THREE.Vector3(-3, 0, 15),

			new THREE.Vector3(-3, 5, -9),
			new THREE.Vector3(-3, 0, -9),
			new THREE.Vector3(-3, 5, -15),
			new THREE.Vector3(-3, 0, -15),

		)

		this.geometry1.faces.push(
			//sides
			new THREE.Face3(0, 1, 2),
			new THREE.Face3(1, 3, 2),
			new THREE.Face3(0, 2, 4),
			new THREE.Face3(0, 4, 5),
			new THREE.Face3(5, 4, 6),

			new THREE.Face3(6, 7, 5),
			new THREE.Face3(1, 9, 3),
			new THREE.Face3(9, 8, 3),
			new THREE.Face3(8, 9, 11),
			new THREE.Face3(11, 10, 8),

			new THREE.Face3(12, 13, 14),
			new THREE.Face3(13, 15, 14),
			new THREE.Face3(12, 14, 16),
			new THREE.Face3(16, 17, 12),
			new THREE.Face3(17, 16, 18),

			new THREE.Face3(17, 18, 19),
			new THREE.Face3(13, 21, 15),
			new THREE.Face3(21, 20, 15),
			new THREE.Face3(21, 23, 20),
			new THREE.Face3(23, 22, 20),


			//front
			new THREE.Face3(7, 6, 18),
			new THREE.Face3(7, 19, 18),

			//back
			new THREE.Face3(23, 11, 22),
			new THREE.Face3(11, 10, 22),

			//top
			new THREE.Face3(3, 2, 14),
			new THREE.Face3(3, 15, 14),
			new THREE.Face3(2, 14, 16),
			new THREE.Face3(4, 2, 16),
			new THREE.Face3(4, 16, 18),

			new THREE.Face3(6, 4, 18),
			new THREE.Face3(3, 8, 15),
			new THREE.Face3(8, 20, 15),
			new THREE.Face3(8, 10, 20),
			new THREE.Face3(10, 22, 20),

			//bottom

			new THREE.Face3(0, 1, 12),
			new THREE.Face3(1, 13, 12),
			new THREE.Face3(0, 12, 17),
			new THREE.Face3(0, 17, 5),
			new THREE.Face3(5, 17, 19),

			new THREE.Face3(7, 5, 19),
			new THREE.Face3(1, 9, 13),
			new THREE.Face3(9, 21, 13),
			new THREE.Face3(9, 11, 21),
			new THREE.Face3(11, 23, 21),

		)

		this.geometry1.computeFaceNormals();
		this.mesh1 = new THREE.Mesh();
		var mesh = new THREE.Mesh(this.geometry1, this.mainPieceMaterial);
		mesh.name = "mainPiece";
		this.mesh1.add(mesh);

		//mouth
		this.geometry2 = new THREE.Geometry();

		this.geometry2.vertices.push(
			new THREE.Vector3(0, 2.5, 21),
			new THREE.Vector3(-3, 5, 15),
			new THREE.Vector3(-3, 0, 15),
			new THREE.Vector3(3, 5, 15),
			new THREE.Vector3(3, 0, 15)
	)

		this.geometry2.faces.push(
			new THREE.Face3(0, 2, 4),
			new THREE.Face3(0, 3, 1),
			new THREE.Face3(0, 1, 2),
			new THREE.Face3(0, 4, 3),

		)

		this.geometry2.computeFaceNormals();
		var mesh0 = new THREE.Mesh(this.geometry2, this.mainPieceMaterial);
		mesh0.name = "mouth";
		this.mesh1.add(mesh0);


		this.add(this.mesh1);

		//wing
		this.geometry3 = new THREE.Geometry();

		this.geometry3.vertices.push(
			new THREE.Vector3(3, 2.5, 3),
			new THREE.Vector3(6, 2.5, 2.6),
			new THREE.Vector3(9, 2.5, 2.2),
			new THREE.Vector3(12, 2.5, 1.8),

			new THREE.Vector3(15, 2.5, 1.4),
			new THREE.Vector3(18, 2.5, 1),
			new THREE.Vector3(3, 2.5, -3),
			new THREE.Vector3(6, 2.5, -2.6),

			new THREE.Vector3(9, 2.5, -2.2),
			new THREE.Vector3(12, 2.5, -1.8),
			new THREE.Vector3(15, 2.5, -1.4),
			new THREE.Vector3(18, 2.5, -1)
		)

		this.geometry3.faces.push(
			new THREE.Face3(6, 0, 1),
			new THREE.Face3(7, 6, 1),
			new THREE.Face3(1, 2, 7),
			new THREE.Face3(7, 2, 8),
			new THREE.Face3(2, 3, 8),

			new THREE.Face3(8, 3, 9),
			new THREE.Face3(4, 9, 3),
			new THREE.Face3(9, 4, 10),
			new THREE.Face3(4, 5, 10),
			new THREE.Face3(5, 11, 10),

		)

		this.geometry3.computeFaceNormals();
		this.mesh2 = new THREE.Mesh();

		var mesh1 = new THREE.Mesh(this.geometry3, this.wingMaterial);
		mesh1.name = "leftWing";
		this.mesh2.add(mesh1);

		var mesh2 = new THREE.Mesh(this.geometry3, this.wingMaterial);
		mesh2.rotateY(Math.PI);
		mesh2.name = "rightWing";
		this.mesh2.add(mesh2);

		this.add(this.mesh2);

		//horizontalStabilizer
		this.geometry4 = new THREE.Geometry();

		this.geometry4.vertices.push(
			new THREE.Vector3(3, 2.5, -11),
			new THREE.Vector3(5, 2.5, -11.25),
			new THREE.Vector3(7, 2.5, -11.5),
			new THREE.Vector3(9, 2.5, -11.75),

			new THREE.Vector3(11, 2.5, -12),
			new THREE.Vector3(3, 2.5, -14),
			new THREE.Vector3(5, 2.5, -13.75),
			new THREE.Vector3(7, 2.5, -13.5),

			new THREE.Vector3(9, 2.5, -13.25),
			new THREE.Vector3(11, 2.5, -13)
		)

		this.geometry4.faces.push(
			new THREE.Face3(5, 0, 1),
			new THREE.Face3(6, 5, 1),
			new THREE.Face3(1, 2, 6),
			new THREE.Face3(6, 2, 7),

			new THREE.Face3(2, 3, 7),
			new THREE.Face3(7, 3, 8),
			new THREE.Face3(4, 8, 3),
			new THREE.Face3(8, 4, 9)

		)

		this.geometry4.computeFaceNormals();
		this.mesh3 = new THREE.Mesh();

		var mesh3 = new THREE.Mesh(this.geometry4, this.stabilizerMaterial);
		mesh3.position.set(0, 0, 0);
		mesh3.name = "leftstabilizer";
		this.mesh3.add(mesh3);

		var mesh4 = new THREE.Mesh(this.geometry4, this.stabilizerMaterial);
		mesh4.position.set(0, 0, 0);
		mesh4.rotation.y += Math.PI;
		mesh4.position.z -= 25;
		mesh4.name = "rightStabilizer";
		this.mesh3.add(mesh4);

		//verticalStabilizer
		this.geometry5 = new THREE.Geometry();

		this.geometry5.vertices.push(
			new THREE.Vector3(0.5, 5, -15),
			new THREE.Vector3(0.5, 13, -15),
			new THREE.Vector3(0.5, 13, -14),
			new THREE.Vector3(0.5, 5, -14),

			new THREE.Vector3(0.5, 6.5, -14),
			new THREE.Vector3(0.5, 5, -12),
			new THREE.Vector3(0.5, 6.5, -12),
			new THREE.Vector3(0.5, 5, -9.5),

			new THREE.Vector3(-0.5, 5, -15),
			new THREE.Vector3(-0.5, 13, -15),
			new THREE.Vector3(-0.5, 13, -14),
			new THREE.Vector3(-0.5, 5, -14),

			new THREE.Vector3(-0.5, 6.5, -14),
			new THREE.Vector3(-0.5, 5, -12),
			new THREE.Vector3(-0.5, 6.5, -12),
			new THREE.Vector3(-0.5, 5, -9.5),
		)

		this.geometry5.faces.push(
			//left
			new THREE.Face3(1, 2, 0),
			new THREE.Face3(3, 0, 2),
			new THREE.Face3(4, 2, 6),

			new THREE.Face3(4, 6, 3),
			new THREE.Face3(5, 3, 6),
			new THREE.Face3(5, 6, 7),
			//right
			new THREE.Face3(9, 10, 8),
			new THREE.Face3(11, 8, 10),
			new THREE.Face3(12, 10, 14),

			new THREE.Face3(12, 14, 11),
			new THREE.Face3(13, 11, 14),
			new THREE.Face3(13, 14, 15),
			//front
			new THREE.Face3(9, 10, 2),
			new THREE.Face3(9, 2, 1),
			new THREE.Face3(14, 6, 10),

			new THREE.Face3(2, 10, 6),
			new THREE.Face3(15, 7, 14),
			new THREE.Face3(6, 14, 7),

			//back
			new THREE.Face3(0, 8, 1),
			new THREE.Face3(1, 9, 8),

		)

			this.geometry5.computeFaceNormals();

			var mesh4 = new THREE.Mesh(this.geometry5, this.stabilizerMaterial);
			mesh4.position.set(0, 0, 0);
			mesh4.name = "verticalStabilizer";
			this.mesh3.add(mesh4);

			this.add(this.mesh3);


			//cockpit

			this.geometry6 = new THREE.Geometry();

			this.geometry6.vertices.push(
				new THREE.Vector3(2.5, 5, 10),
				new THREE.Vector3(1, 5, 10),
				new THREE.Vector3(-1, 5, 10),
				new THREE.Vector3(-2.5, 5, 10),

				new THREE.Vector3(-2.5, 5, 7),
				new THREE.Vector3(-2.5, 5, 5),
				new THREE.Vector3(-2.5, 5, 2),
				new THREE.Vector3(-1, 5, 2),

				new THREE.Vector3(1, 5, 2),
				new THREE.Vector3(2.5, 5, 2),
				new THREE.Vector3(2.5, 5, 5),
				new THREE.Vector3(2.5, 5, 7),

				new THREE.Vector3(1, 7.5, 7),
				new THREE.Vector3(-1, 7.5, 7),
				new THREE.Vector3(-1, 7.5, 5),
				new THREE.Vector3(1, 7.5, 5),
			)

			this.geometry6.faces.push(
				//sides
				new THREE.Face3(0, 1, 12),
				new THREE.Face3(1, 12, 13),
				new THREE.Face3(1, 2, 13),
				new THREE.Face3(2, 3, 13),

				new THREE.Face3(4, 3, 13),
				new THREE.Face3(4, 5, 13),
				new THREE.Face3(13, 14, 5),
				new THREE.Face3(5, 6, 14),

				new THREE.Face3(6, 7, 14),
				new THREE.Face3(14, 15, 7),
				new THREE.Face3(7, 8, 15),
				new THREE.Face3(8, 9, 15),

				new THREE.Face3(9, 10, 15),
				new THREE.Face3(10, 15, 12),
				new THREE.Face3(10, 11, 12),
				new THREE.Face3(0, 11, 12),

				//top
				new THREE.Face3(12, 13, 14),
				new THREE.Face3(14, 15, 12),


			)

			this.geometry6.computeFaceNormals();
			this.mesh4 = new THREE.Mesh();

			var mesh5 = new THREE.Mesh(this.geometry6, this.cockpitMaterial);
			mesh5.position.set(0, 0, 0);
			mesh5.name = "cockpit";

			this.mesh4.add(mesh5);

			this.add(this.mesh4);
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
		this.mesh3.children[0].material = this.stabilizerMaterial;
		this.mesh3.children[1].material = this.stabilizerMaterial;
		this.mesh4.material = this.cockpitMaterial;


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
		this.mesh3.children[0].material = this.stabilizerMaterial;
		this.mesh3.children[1].material = this.stabilizerMaterial;
		this.mesh3.children[2].material = this.stabilizerMaterial;
		this.mesh4.material = this.cockpitMaterial;

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
		this.mesh3.children[0].material = this.stabilizerMaterial;
		this.mesh3.children[1].material = this.stabilizerMaterial;
		this.mesh3.children[2].material = this.stabilizerMaterial;
		this.mesh4.material = this.cockpitMaterial;
	}
}
