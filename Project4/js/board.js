'use strict'

class Board extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
		this.board = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/tabuleiroDeXadrez.jpg");

		this.geometry = new THREE.CubeGeometry(40, 1, 40);
		this.basicMaterial = new THREE.MeshBasicMaterial({ map: this.board , wireframe : false});
		this.gouraudMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: this.board });
		this.material = this.gouraudMaterial;

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0,0,0);
		this.add(this.mesh);
  }




}
