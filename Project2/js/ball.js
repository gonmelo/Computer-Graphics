'use strict'

class Ball extends THREE.Object3D {

	constructor(x,y,z) {
		super();
    this.radius 	= .5;
    this.maxX     =  2*Math.sqrt(5) - .6;
    this.minX     =  -2*Math.sqrt(5) + .6;
    this.maxZ     =  Math.sqrt(5) - .6;
    this.minZ     =  -Math.sqrt(5) + .6;
		this.center   = new Point(x,z);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    this.velocity = new THREE.Vector3(Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5, 0, Math.floor(Math.random() * (3.5 + 3.5 + 1)) - 3.5);
    this.axisUP   = new THREE.Vector3(0,1,0);
    this.axis     = new THREE.Vector3();

    //this.matrix = new THREE.Matrix4();

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

	moveB() {

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

    //this.rotation.z += this.velocity.x * deltaT / 0.5;
    this.position.x = tentative_x;
    //this.rotation.x += this.velocity.z * deltaT / 0.5;
    this.position.z = tentative_z;


    //this.rotateOnAxis(this.axis.cross(this.axisUP).normalize(), this.velocity.length() * deltaT / 0.5);


     //this.quaternion.setFromAxisAngle( this.velocity, Math.PI / 2 );
     //this.rotation.setFromQuaternion(this.quaternion.normalize());
     //this.applyQuaternion(this.quaternion);

    // alpha = Math.PI / 2 - Math.atan2(this.velocity.x, this.velocity.z); -- angulo em relacao ao eixo XX  q pode
    // ser preciso para calculo da velocidade atraves dos angulos


	}

  seeCollision(i){

    var this_tentative_x = this.position.x + this.velocity.x * deltaT;
    var this_tentative_z = this.position.z + this.velocity.z * deltaT;

    for(var j = i; j < 10; j++) {


      var j_tentative_x = balls[j].position.x + balls[j].velocity.x * deltaT;
  		var j_tentative_z = balls[j].position.z + balls[j].velocity.z * deltaT;

        var distance = Math.pow(this_tentative_x - j_tentative_x, 2) + Math.pow(this_tentative_z - j_tentative_z, 2);

        if (distance <= sumRadius){
          var velj = new THREE.Vector3();

          velj.copy(balls[j].velocity);
          balls[j].velocity = this.calculateVelocity(balls[j].velocity, this.velocity, balls[j].position, this.position);
          this.velocity = this.calculateVelocity(this.velocity, velj, this.position, balls[j].position);
        /*  var vel1_x = ball1.velocity.x;
          var vel1_z= ball1.velocity.z;
          ball1.velocity.x = ball.velocity.x;
          ball.velocity.x = vel1_x;
          ball1.velocity.z = ball.velocity.z;
          ball.velocity.z = vel1_z;*/

      }
    }
  }

  rotate() {
    this.axis.copy(this.velocity);
    var matrix4 = new THREE.Matrix4();

    matrix4.makeRotationAxis(this.axis.cross(this.axisUP).normalize(), this.velocity.length() * deltaT / 0.5);
    //this.setRotationFromMatrix(matrix4);
    //console.log(matrix4);
    this.applyMatrix(matrix4);
  }

  calculateVelocity(v1, v2, c1, c2){
    var deltaV = new THREE.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    var deltaC = new THREE.Vector3(c1.x - c2.x, c1.y - c2.y, c1.z - c2.z);
    var num = deltaV.x * deltaC.x + deltaV.y * deltaC.y + deltaV.z * deltaC.z;
    var den = Math.pow(deltaC.x, 2) + Math.pow(deltaC.y, 2) + Math.pow(deltaC.z, 2);
    var fracao = num / den;
    var res = new THREE.Vector3(fracao * deltaC.x, fracao * deltaC.y, fracao * deltaC.z);
    return new THREE.Vector3(v1.x - res.x, v1.y - res.y, v1.z - res.z);
  }


}
