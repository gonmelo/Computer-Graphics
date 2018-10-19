class Field extends THREE.Object3D {
	constructor() {
		super();
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false});
    this.material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    this.addBase(0,0,0);
    this.addWalls();

	}

	addBase(x, y, z) {
    var base = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(4*Math.sqrt(5),1,2*Math.sqrt(5));
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.name = "base";
    mesh.position.set(x, y + .5, z);
    base.add(mesh);
    this.add(base);
	}

	addWalls() {
		var walls = new THREE.Object3D();
		walls.name = "walls";
		this.addWall(-2*Math.sqrt(5) +.05, 1.5, 0, walls);
		this.addWall(2*Math.sqrt(5) - .05, 1.5, 0, walls);
		this.addWallandRotate(0, 1.5, Math.sqrt(5) - .05, walls);
		this.addWallandRotate(0, 1.5, -Math.sqrt(5) + .05, walls);
		this.add(walls);
	}

	addWall(x, y, z, object) {
		geometry = new THREE.CubeGeometry(.1, 1, 2*Math.sqrt(5));
    mesh = new THREE.Mesh(geometry, this.material2);
    mesh.position.set(x, y, z);
		mesh.name = "wall";
    object.add(mesh);
	}

	addWallandRotate(x, y, z, object) {
		geometry = new THREE.CubeGeometry(.1, 1, 4*Math.sqrt(5));
    mesh = new THREE.Mesh(geometry, this.material2);
    mesh.position.set(x , y, z);
    mesh.rotation.y += Math.PI / 2;
		mesh.name = "wall";
    object.add(mesh);
	}
}
