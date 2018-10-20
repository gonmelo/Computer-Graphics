'use strict'

class Ball extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.radius 	= 1;
		this.center   = new Point(x,z);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
		this.velocity = new THREE.Vector3(Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5, 0, Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5);

		var geometry 	= new THREE.SphereGeometry(0.5, 20, 20);
    var mesh     	= new THREE.Mesh(geometry, this.material);

		this.addAxes();
		this.position.set(x,y,z);

    mesh.name = "ball";
		this.add(mesh);
	}

	addAxes() {
		var axes  = new THREE.AxesHelper();
		axes.name = "axes";
		this.add(axes);
	}

	move(deltaT) {
		this.position.x += this.velocity.x * deltaT;
		this.position.z += this.velocity.z * deltaT;
	}

}
