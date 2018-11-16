'use strict'

class MagicMike extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
    var cubeBumpMap = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/bump.png");
		this.geometry = new THREE.CubeGeometry(5, 5, 5);
		this.materials = [
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffd500.png"), bumpMap: cubeBumpMap}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffffff.png"), bumpMap: cubeBumpMap}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/F51105.png"), bumpMap: cubeBumpMap}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/B90000.png"), bumpMap: cubeBumpMap}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/009B48.png"), bumpMap: cubeBumpMap}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/0045AD.png"), bumpMap: cubeBumpMap}),
    ];
		this.mesh = new THREE.Mesh(this.geometry, this.materials);
		this.mesh.position.set(0,3,0);
		this.add(this.mesh);
  }
}
