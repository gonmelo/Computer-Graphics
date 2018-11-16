'use strict'

class Pause extends THREE.Object3D {

  constructor(){
    super();

    var texloader = new THREE.TextureLoader();

		var tex = texloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/Pause.jpg");

    this.material = new THREE.MeshBasicMaterial({ map: tex });
		this.geometry = new THREE.PlaneGeometry(20, 20, 20);
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0, 20, 0);

    this.add(this.mesh);

    this.visible = false;
  }
}
