'use strict'

class Ball extends THREE.Object3D{

  constructor(){

    super();

    var textloader = new THREE.TextureLoader();
		this.texture = textloader.load("http://web.tecnico.ulisboa.pt/ist187660/IPM/images/ball12.jpg");

		this.geometry = new THREE.SphereGeometry( 3, 32, 32 );
		this.material = new THREE.MeshPhongMaterial({ map: this.texture });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set( 15, 3.5, 0 );
		this.add(this.mesh);
  }


  move(acceleration) {
		var deltaT = clock.getDelta();

		if (speed < maxSpeed && speed >= 0){
	    speed += acceleration * deltaT;
		 }

    if (acceleration < 0){
      //this.rotation.y -= 0.05; //acceleration * deltaT / 3;
      if (speed < 0.0001) {
  			speed = 0;
  			acceleration = 0;
  		}
    }
		var deltaX = ( speed * deltaT + 0.5 * acceleration * Math.pow(deltaT,2) );


    this.rotation.y += deltaX;

    //this.position.x += (Math.sin(this.rotation.y)) * deltaX;
    //this.position.z += (Math.cos(this.rotation.y)) * deltaX;

    //this.rotation.x += (Math.sin(this.rotation.y)) * deltaX / 3;
    //this.rotation.z += (Math.cos(this.rotation.y)) * deltaX / 3;
  }

}
