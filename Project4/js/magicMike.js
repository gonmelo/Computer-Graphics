'use strict'

class MagicMike extends THREE.Object3D{

  constructor(){
    super();

    var cubeBumpMap = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/bump.png");
		this.geometry = new THREE.CubeGeometry(5, 5, 5);
		var pM = [
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffd500.png"), bumpMap: cubeBumpMap,shininess: 10, specular: 0x101010 , wireframe: false}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffffff.png"), bumpMap: cubeBumpMap, shininess: 10, specular: 0x101010 , wireframe: false}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/F51105.png"), bumpMap: cubeBumpMap,shininess: 10, specular: 0x101010 , wireframe: false}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/B90000.png"), bumpMap: cubeBumpMap, shininess: 10, specular: 0x101010 , wireframe: false}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/009B48.png"), bumpMap: cubeBumpMap, shininess: 10, specular: 0x101010 , wireframe: false}),
      new THREE.MeshPhongMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/0045AD.png"), bumpMap: cubeBumpMap, shininess: 10, specular: 0x101010 , wireframe: false}),
    ];
    var bM = [
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffd500.png"), wireframe: false}),
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ffffff.png"), wireframe: false}),
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/F51105.png"), wireframe: false}),
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/B90000.png"), wireframe: false}),
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/009B48.png"), wireframe: false}),
      new THREE.MeshBasicMaterial({ map: textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/0045AD.png"), wireframe: false}),
    ];

		this.mesh = new SceneMesh(this.geometry, bM, pM, 1);
		this.position.set(0,3,0);
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
