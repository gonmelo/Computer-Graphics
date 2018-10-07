'use strict'

class Chair extends THREE.Object3D {
	constructor() {
		super();
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    this.addChairBack(0, 21, 0);
    this.addChairSit(0, 19, 0);
    this.addChairSupport(0, 7, 0);

    this.addChairLeg1(-1, 4, 0);
    this.addChairLeg1(9, 4, 0);
    this.addChairLeg2(0, 4, -1);
    this.addChairLeg2(0, 4, 9);

    this.addChairWheel(-9, 0, 1);
    this.addChairWheel(7, 0, 1);
    this.addChairWheel(-1, 0, 9);
    this.addChairWheel(-1, 0, -7);
	}

  addChairSit(x, y, z) {
    geometry = new THREE.CubeGeometry(20, 2, 20);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y + 1, z);
		mesh.name = "chairSit";
    this.add(mesh);
  }
  addChairSupport(x, y, z) {
    var geometry = new THREE.CubeGeometry( 2, 12, 2);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+6, z);
		mesh.name = "chairSupport";
    this.add(mesh);
  }
  addChairLeg1(x, y, z) {
    var geometry = new THREE.CubeGeometry(8, 3, 1);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x - 4, y+1.5, z);
		mesh.name = "chairLeg";
    this.add(mesh);
  }
  addChairLeg2(x, y, z) {
    var geometry = new THREE.CubeGeometry(1, 3, 8);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+1.5, z - 4);
		mesh.name = "chairLeg";
    this.add(mesh);
  }
  addChairWheel(x, y, z) {
    geometry = new THREE.TorusGeometry(1, 1, 5, 10);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x + 1, y+2, z-1);
    mesh.rotation.y += Math.PI / 2;
		mesh.name = "chairWheel";
    this.add(mesh);
  }
  addChairBack(x, y, z) {
    geometry = new THREE.CubeGeometry(20, 20, 2);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y+10, z-9);
		mesh.name = "chairBack";
    this.add(mesh);
  }

	move(){
		if(direction){
			if (speed < maxSpeed)
      	speed += acceleration;
    	chair.position.x += (Math.sin(chair.rotation.y)) * speed;
    	chair.position.z += (Math.cos(chair.rotation.y)) * speed;
			chair.children.forEach(function(children) {
				if (children.name == "chairWheel") {
					if (Math.cos(chair.rotation.y) < 0) {
						children.rotation.x -= (Math.sin(chair.rotation.y)) * speed /3.14;
						children.rotation.z -= (Math.cos(chair.rotation.y)) * speed /3.14;
					}
					else {
						children.rotation.x += (Math.sin(chair.rotation.y)) * speed /3.14;
						children.rotation.z += (Math.cos(chair.rotation.y)) * speed /3.14;
					}
				}
			});
		}
		else {
			if (speed < maxSpeed)
      	speed += acceleration;
    	chair.position.x -= (Math.sin(chair.rotation.y)) * speed;
    	chair.position.z -= (Math.cos(chair.rotation.y)) * speed;
			chair.children.forEach(function(children) {
				if (children.name == "chairWheel") {
					if (Math.cos(chair.rotation.y) < 0) {
						children.rotation.x += (Math.sin(chair.rotation.y)) * speed /3.14;
						children.rotation.z += (Math.cos(chair.rotation.y)) * speed /3.14;
					}
					else {
						children.rotation.x -= (Math.sin(chair.rotation.y)) * speed /3.14;
						children.rotation.z -= (Math.cos(chair.rotation.y)) * speed /3.14;
					}
				}
			});
		}
	}

	stop(){
		speed *= friction;
    if (speed < 0.001)
      speed = 0;
			if (direction){
	      chair.position.x += (Math.sin(chair.rotation.y)) * speed;
	      chair.position.z += (Math.cos(chair.rotation.y)) * speed;
				chair.children.forEach(function(children) {
					if (children.name == "chairWheel") {
						if (Math.cos(chair.rotation.y) < 0) {
							children.rotation.x -= (Math.sin(chair.rotation.y)) * speed /3.14;
							children.rotation.z -= (Math.cos(chair.rotation.y)) * speed /3.14;
						}
						else {
							children.rotation.x += (Math.sin(chair.rotation.y)) * speed /3.14;
							children.rotation.z += (Math.cos(chair.rotation.y)) * speed /3.14;
						}
					}
				});
		}
    else {
      chair.position.x -= (Math.sin(chair.rotation.y)) * speed;
      chair.position.z -= (Math.cos(chair.rotation.y)) * speed;
			chair.children.forEach(function(children) {
				if (children.name == "chairWheel") {
					if (Math.cos(chair.rotation.y) < 0) {
						children.rotation.x += (Math.sin(chair.rotation.y)) * speed / 3.14;
						children.rotation.z += (Math.cos(chair.rotation.y)) * speed /3.14;
					}
					else {
						children.rotation.x -= (Math.sin(chair.rotation.y)) * speed / 3.14;
						children.rotation.z -= (Math.cos(chair.rotation.y)) * speed /3.14;
					}
				}
			});
    }
	}



}
