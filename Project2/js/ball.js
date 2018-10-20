'use strict'

class Ball extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.radius 	= 1;
    this.maxX     =  2*Math.sqrt(5) - .6;
    this.minX     =  -2*Math.sqrt(5) + .6;
    this.maxZ     =  Math.sqrt(5) - .6;
    this.minZ     =  -Math.sqrt(5) + .6;
		this.center   = new Point(x,z);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    this.velocity = new THREE.Vector3(Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5, 0, Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5);

		var geometry 	= new THREE.SphereGeometry(0.5, 20, 10);
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

		var tentative_x = this.position.x + this.velocity.x * deltaT;
		var tentative_z = this.position.z + this.velocity.z * deltaT;

    if (tentative_x < this.minX) {
        this.velocity.x = -this.velocity.x;
        tentative_x = this.minX;
    } else if (tentative_x > this.maxX) {
        this.velocity.x = -this.velocity.x;
        tentative_x = this.maxX;
    }
    if (tentative_z < this.minZ) {
        this.velocity.z = -this.velocity.z;
        tentative_z = this.minZ;
    } else if (tentative_z > this.maxZ) {
        this.velocity.z = -this.velocity.z;
        tentative_z = this.maxZ;
    }
    this.position.x = tentative_x;
    this.position.z = tentative_z;


    // alpha = Math.PI / 2 - Math.atan2(this.velocity.x, this.velocity.z); -- angulo em relacao ao eixo XX  q pode
    // ser preciso para calculo da velocidade atraves dos angulos
    //var velocity = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.z, 2));
    // this.rotation.x += this.velocity.x * deltaT / 0.5;
      // this.rotation.z += this.velocity.z * deltaT / 0.5;
	}

  seeCollision(ball1){

    balls.forEach(function(ball) {
      if (ball.position.x != ball1.position.x || ball.position.z != ball1.position.z ){
        var distance = Math.pow(ball.position.x - ball1.position.x, 2) + Math.pow(ball.position.z - ball1.position.z, 2);

        if (distance <= sumRadius){
          //ball1.velocity = calculateVelocity(ball1.velocity, ball.velocity, ball1.position, ball.position);
          var vel1_x = ball1.velocity.x;
          var vel1_z= ball1.velocity.z;
          ball1.velocity.x = ball.velocity.x;
          ball.velocity.x = vel1_x;
          ball1.velocity.z = ball.velocity.z;
          ball.velocity.z = vel1_z;

          ball.position.x += ball.velocity.x * deltaT;
          ball1.position.x += ball1.velocity.x * deltaT;
          ball.position.z += ball.velocity.z * deltaT;
          ball1.position.z += ball1.velocity.z * deltaT;
        }
      }
    });
  }

  calculateVelocity(v1, v2, c1, c2){
    var deltaV = new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);
    var deltaC = new THREE.Vector3(c2.x - c1.x, c2.y - c1.y, c2.z - c1.z);
    var num = deltaV.x * deltaC.x + deltaV.y * deltaC.y + deltaV.z * deltaC.z;
    var den = Math.sqrt(Math.pow(deltaC.x, 2) + Math.pow(deltaC.y, 2) + Math.pow(deltaC.z, 2));
    var fracao = num / den;
    var res = new THREE.Vector3(fracao * deltaC.x, fracao * deltaC.y, fracao * deltaC.z);
    return new THREE.Vector3(v1.x - res.x, v1.y - res.y, v1.z - res.z);
  }
}
