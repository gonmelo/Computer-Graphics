'use strict'

class Board extends THREE.Object3D{

  constructor(){
    super();

		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/tabuleiroDeXadrez.jpg");
		this.geometry = new THREE.CubeGeometry(40, 1, 40);
		var pM = new THREE.MeshPhongMaterial({ specular: 0x101010, shininess: 10, map: this.texture , wireframe: false});
    var bM = new THREE.MeshBasicMaterial({ map: this.texture , wireframe: false});
		this.mesh = new SceneMesh(this.geometry, bM, pM, 1);
		this.position.set(0,0,0);
		this.add(this.mesh);
  }

  changeMaterial(flag){
    if(flag == 1)
      this.mesh.material = this.mesh.phongMaterial;
    else {
      this.mesh.material = this.mesh.basicMaterial;
      }
  }


}
