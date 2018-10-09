'use strict'

class Chair extends THREE.Object3D {
	constructor() {
		super();
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    this.addBack(0, 21, 0);
    this.addSeat(0, 19, 0);
    this.addSupport(0, 7, 0);

		this.addSpindle();
		this.addWheels();
	}

  addSeat(x, y, z) {
    geometry = new THREE.CubeGeometry(20, 2, 20);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 1, z);
		mesh.name = "seat";
    this.add(mesh);
  }

  addSupport(x, y, z) {
    var geometry = new THREE.CubeGeometry( 2, 12, 2);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+6, z);
		mesh.name = "support";
    this.add(mesh);
  }

  addLeg(x, y, z, object) {
    var geometry = new THREE.CubeGeometry(8, 3, 1);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x - 4, y+1.5, z);
		mesh.name = "leg";
    object.add(mesh);
  }

	addLegAndRotate(x, y, z, object) {
    var geometry = new THREE.CubeGeometry(8, 3, 1);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+1.5, z - 4);
		mesh.name = "leg";
		mesh.rotation.y += Math.PI / 2;
    object.add(mesh);
  }

  addWheel(x, y, z, object) {
    geometry = new THREE.TorusGeometry(1, 1, 5, 10);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x + 1, y+2, z-1);
    mesh.rotation.y += Math.PI / 2;
		mesh.name = "chairWheel";
    object.add(mesh);
  }

  addBack(x, y, z) {
		//var back = new THREE.Object3D();
    geometry = new THREE.CubeGeometry(20, 20, 2);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+10, z-9);
		mesh.name = "back";
    //back.add(mesh);
		this.add(mesh);
  }

	addSpindle() {
		var spindle = new THREE.Object3D();
		spindle.name = "spindle";
		this.addLeg(-1, 4, 0, spindle);
		this.addLeg(9, 4, 0, spindle);
		this.addLegAndRotate(0, 4, -1, spindle);
		this.addLegAndRotate(0, 4, 9, spindle);

		this.add(spindle);
	}

	addWheels() {
		var wheels = new THREE.Object3D();
		wheels.name = "wheels";
		this.addWheel(-9, 0, 1, wheels);
		this.addWheel(7, 0, 1, wheels);
		this.addWheel(-1, 0, 9, wheels);
		this.addWheel(-1, 0, -7, wheels);

		this.add(wheels);
	}

	move(){
		var deltaT = clock.getDelta();
		if (speed < maxSpeed && speed > -maxSpeed){
				speed += acceleration * deltaT;
		}
		var deltaX = ( speed * deltaT + 0.5 * acceleration * Math.pow(deltaT,2) );
    chair.position.x += (Math.sin(chair.rotation.y)) * deltaX;
    chair.position.z += (Math.cos(chair.rotation.y)) * deltaX;
		chair.moveWheels(deltaX);
		}

	stop(){
		var deltaT = clock.getDelta();
		speed += acceleration * deltaT;
    if ((speed < 0.0001 && movingForward) || (speed > -0.0001 && !movingForward)) {
			speed = 0;
			acceleration = 0;
		}
		var deltaX = ( speed * deltaT + 0.5 * acceleration * Math.pow(deltaT,2) );
		chair.position.x += (Math.sin(chair.rotation.y)) * deltaX;
		chair.position.z += (Math.cos(chair.rotation.y)) * deltaX;
		chair.moveWheels(deltaX);
	}

	moveWheels(deltaX) {
		var i = -1;
		chair.children.forEach(function(children) {
			i++;
			if (children.name == "wheels") {
				chair.children[i].children.forEach(function(children) {
					if (Math.cos(chair.rotation.y) < 0) {
						children.rotation.x -= (Math.sin(chair.rotation.y)) * deltaX /2;
						children.rotation.z -= (Math.cos(chair.rotation.y)) * deltaX /2;
					}
					else {
						children.rotation.x += (Math.sin(chair.rotation.y)) * deltaX /2;
						children.rotation.z += (Math.cos(chair.rotation.y)) * deltaX /2;
					}
				});
			}
		});
	}
}
