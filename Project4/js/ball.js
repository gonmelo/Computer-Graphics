'use strict'

class Ball extends THREE.Object3D{

  constructor(){
    super();

		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ball12.jpg");
		this.geometry = new THREE.SphereGeometry( 3, 32, 32 );
		var pM = new THREE.MeshPhongMaterial({ map: this.texture, shininess: 70, specular: 0x1f1f1f , wireframe: false});
    var bM = new THREE.MeshBasicMaterial({ map: this.texture , wireframe: false});
		this.mesh = new SceneMesh(this.geometry, bM, pM, 1);
		this.position.set( 15, 0.5, 0 );
		this.add(this.mesh);
  }


  move(accel) {
		var deltaT = clock.getDelta();
    var speed_tmp = speed + accel * deltaT;
		if (speed_tmp < maxSpeed && speed >= 0){
	    speed += accel * deltaT;
		 }

    if (accel < 0){
      if (speed < 0.0001) {
  			speed = 0;
  			accel = 0;
  		}
    }
		var deltaX = ( speed * deltaT + 0.5 * accel * Math.pow(deltaT,2) );

    ballPivot.rotation.y += deltaX/ 15;
    this.rotation.x -= deltaX / 3;

  }

  changeMaterial(flag) {
    if(flag == 1)
      this.mesh.material = this.mesh.phongMaterial;
    else {
      this.mesh.material = this.mesh.basicMaterial;
      }
  }

  restart(){
    ballPivot.rotation.y = 0;
    this.rotation.x = 0;
  }

}
