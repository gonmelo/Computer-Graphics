'use strict'

class Ball extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.radius 	= 1;
		this.center   = new Point(x,z);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

		var geometry 	= new THREE.SphereGeometry(0.5, 20, 20);
    var mesh     	= new THREE.Mesh(geometry, this.material);

		this.position.set(x,y,z);
    mesh.name = "ball";
		this.add(mesh);
	}

	move() {
		deltaT = clock.getDelta();
		if (speed < maxSpeed && speed > -maxSpeed) {
				speed += acceleration * deltaT;
		}
		deltaX =  speed * deltaT ;
		alpha += deltaAlpha * deltaT;
    chair.position.x += (Math.sin(alpha)) * deltaX;
    chair.position.z += (Math.cos(alpha)) * deltaX;
		chair.moveWheels(deltaX);
		}

	stop(){
		deltaT = clock.getDelta();
		speed += acceleration * deltaT;
    if ((speed < 0.0001 && movingForward) || (speed > -0.0001 && !movingForward)) {
			speed = 0;
			acceleration = 0;
		}
		deltaX =  speed * deltaT ;
		alpha += deltaAlpha * deltaT;
		chair.position.x += (Math.sin(alpha)) * deltaX;
		chair.position.z += (Math.cos(alpha)) * deltaX;
		chair.moveWheels(deltaX);
	}

	moveWheels(deltaX) {
		var wheels = scene.getObjectByName("wheels");
		wheels.children.forEach(function(wheel) {
				if (Math.cos(chair.rotation.y) < 0) {
					wheel.rotation.x -= (Math.sin(alpha)) * deltaX /2;
					wheel.rotation.z -= (Math.cos(alpha)) * deltaX /2;
				}
				else {
					wheel.rotation.x += (Math.sin(alpha)) * deltaX /2;
					wheel.rotation.z += (Math.cos(alpha)) * deltaX /2;
				}
		});
	}
}
