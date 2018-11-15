'use strict'

class MagicMike extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/magicColor.jpg");

		this.geometry = new THREE.CubeGeometry(2, 2, 2);
		this.material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: this.texture });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0,0.5,0);
		this.add(this.mesh);
  }




}
