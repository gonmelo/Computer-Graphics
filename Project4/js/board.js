'use strict'

class Board extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/tabuleiroDeXadrez.jpg");

		this.geometry = new THREE.CubeGeometry(40, 1, 40);
		var lM = new THREE.MeshLambertMaterial({ map: this.texture });
    var bM = new THREE.MeshBasicMaterial({ map: this.texture });
		this.mesh = new THREE.SceneMesh(this.geometry, bM, null, lM);
		this.mesh.position.set(0,0,0);
		this.add(this.mesh);
  }


}
