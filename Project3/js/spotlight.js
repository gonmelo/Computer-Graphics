'use strict'

class SpotLight extends THREE.Object3D {

  constructor(x, y, z, angle, axis){
    super();
    // THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
    this.light = new THREE.SpotLight(0xffffff, 1, 100, Math.PI/6);
    this.angle = angle;
    this.light.position.set(x,  y - 1.75 * Math.cos(this.angle), z);
    this.light.castShadow = true;
    this.add(this.light);

    this.axis = axis;
    this.light.target = plane;
		this.add(this.light.target);

    this.addSphere(x, y, z);
    this.addCone(x, y, z);

  }

    addSphere(x, y, z){
      var sphere = new THREE.Object3D();
      var material = new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: false });
      var geometry = new THREE.SphereGeometry(1.25, 26, 10, 0, 6.3, 0);
      var mesh = new THREE.Mesh(geometry, material);
      if (this.axis == 1){
        mesh.position.set(x + Math.sin(this.angle), y - 1.5 * Math.cos(this.angle), z - Math.sin(Math.PI / 4));
      }
      else if(this.axis == 2){
        mesh.position.set(x + Math.sin(this.angle), y - 1.5 * Math.cos(this.angle), z + Math.sin(Math.PI / 4));
      }
      sphere.add(mesh);
      this.add(sphere);
    }

    addCone(x, y, z){
      var cone = new THREE.Object3D();
      var material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9, wireframe: false });
      var geometry =  new THREE.CylinderGeometry( 0.5, 2, 3 ,25 );
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      if (this.axis == 1){
        mesh.rotation.z += this.angle;
        mesh.rotation.y += this.angle;
      }
      else if (this.axis == 2){
        mesh.rotation.z += this.angle;
        mesh.rotation.y -= this.angle;
      }
      cone.add(mesh);
      this.add(cone);
    }

}
