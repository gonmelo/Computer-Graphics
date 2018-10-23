'use strict'

class Ball extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.radius 	 = .5;
		this.center    = new Point(x,z);
    this.material  = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    this.velocity  = new THREE.Vector3(Math.floor(
												 Math.random() * (1.5 + 1.5 + 1)) - 1.5,
												 0,
		 										 Math.floor(Math.random() * (1.5 + 1.5 + 1)) - 1.5);
    this.axisUP    = new THREE.Vector3(0,1,0);
    this.axis      = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.direction.copy(this.velocity).normalize();

		const geometry 	= new THREE.SphereGeometry( 0.5, 20, 20 );
    this.mesh     	= new THREE.Mesh( geometry, this.material );

		this.addAxes();
		this.position.set(x,y,z);
    mesh.name = "ball";
		this.add(this.mesh);
	}

	addAxes() {
		const axes  = new THREE.AxesHelper();
		axes.name = "axes";
		this.mesh.add(axes);
	}

	moveB() {
		// New position if no collision happen
		var tentative_x = this.position.x + this.velocity.x * deltaT;
		var tentative_z = this.position.z + this.velocity.z * deltaT;

		// Change velocity direction if it hits the wall
    if (tentative_x < minX) {
        this.velocity.x = -this.velocity.x;
        tentative_x     = minX;
    } else if (tentative_x > maxX) {
        this.velocity.x = -this.velocity.x;
        tentative_x     = maxX;
    }
    if ( tentative_z < minZ ) {
        this.velocity.z = -this.velocity.z;
        tentative_z     = minZ;
    } else if ( tentative_z > maxZ ) {
        this.velocity.z = -this.velocity.z;
        tentative_z     = maxZ;
    }

		// Update position
    this.position.x = tentative_x;
    this.position.z = tentative_z;
    this.rotate();
	}

  seeCollision(i){
    for( var j = i; j < balls.length; j++ ) {
			// Position in next frame if no collisions happen for balls[j]
     	const this_tentative_x = this.position.x + this.velocity.x * deltaT;
      const this_tentative_z = this.position.z + this.velocity.z * deltaT;
      const j_tentative_x = balls[j].position.x + balls[j].velocity.x * deltaT;
  		const j_tentative_z = balls[j].position.z + balls[j].velocity.z * deltaT;

			// Distance between this ball and balls[j]
			var distance = Math.sqrt(Math.pow(this_tentative_x - j_tentative_x, 2) + Math.pow(this_tentative_z - j_tentative_z, 2));

			// If balls would overlap in next frame, change speed accordingly
      if (distance <= this.radius + balls[j].radius){
				// temp variable to store balls[j] velocity
        var velj = new THREE.Vector3();
        velj.copy(balls[j].velocity);
				// Switch velocities
        balls[j].velocity = this.calculateVelocity(balls[j].velocity, this.velocity, balls[j].position, this.position);
        this.velocity = this.calculateVelocity(this.velocity, velj, this.position, balls[j].position);
      }
    }
  }

  rotate() {
    var matrix4 = new THREE.Matrix4();
		// Get the rotation axis (normalized)
    this.axis = this.velocity.clone();
    this.axis.cross(this.axisUP).normalize();
		// makeRotationAxis(axis, theta). Theta is delta X / radius
    matrix4.makeRotationAxis(this.axis, this.velocity.length() * deltaT / 0.5);
    this.mesh.applyMatrix(matrix4);
  }

  calculateVelocity( v1, v2, c1, c2 ) {
		// New speeds after collision detected
    const deltaV = new THREE.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    const deltaC = new THREE.Vector3(c1.x - c2.x, c1.y - c2.y, c1.z - c2.z);
    const num = deltaV.x * deltaC.x + deltaV.y * deltaC.y + deltaV.z * deltaC.z;
    const den = Math.pow(deltaC.x, 2) + Math.pow(deltaC.y, 2) + Math.pow(deltaC.z, 2);
    const fraction = num / den;
    const res = new THREE.Vector3(fraction * deltaC.x, fraction * deltaC.y, fraction * deltaC.z);

    return new THREE.Vector3(v1.x - res.x, v1.y - res.y, v1.z - res.z);
  }

  updateVelocity() {
		// New velocity after each level up
    this.velocity.x *= 1.5;
    this.velocity.z *= 1.5;
  }
}
