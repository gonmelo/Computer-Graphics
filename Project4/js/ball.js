'use strict'

class Ball extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ball12.jpg");

		this.geometry = new THREE.SphereGeometry( 3, 32, 32 );
		this.material = new THREE.MeshPhongMaterial({ map: this.texture, shininess: 70, specular: 0x1f1f1f });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set( magicMike.mesh.position.x + 15, 0.5, magicMike.mesh.position.z );
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

    ballCenter.rotation.y += deltaX/ 12;
    //this.rotation.y += deltaX / 13;
    this.mesh.rotation.x -= deltaX / 3;

  }

}
