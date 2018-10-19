'use strict'

class Ball extends THREE.Object3D {

	constructor() {
		super();
    this.radius = 1;
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
	}

	addBall(x, y, z, object) {
    var geometry = new THREE.SphereGeometry(5*Math.sqrt(5)/2, 26, 20, 0, 6.3, 0, 3.2);
    mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(x, y, z);
    mesh.name = "ball";
    object.add(mesh);
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
