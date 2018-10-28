'use strict'

class PointLight extends THREE.Object3D {

  constructor(x, y, z){
    super();
    this.light = new THREE.PointLight (0xffff00, 10);
    this.light.position.set(x, y - 3.5, z);
    this.add(this.light);
    this.material = new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: false });

    this.addSphere(x, y, z);
    this.addCone(x, y, z);

  }

    addSphere(x, y, z){
      var sphere = new THREE.Object3D();
      var geometry = new THREE.SphereGeometry(2, 26, 10, 0, 6.3, 0, 1.5);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y - 3.5, z);
      sphere.add(mesh);
      this.add(sphere);
    }

    addCone(x, y, z){
      var cone = new THREE.Object3D();
      var geometry =  new THREE.CylinderGeometry( 0, 2, 6 ,25 );
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      cone.add(mesh);
      this.add(cone);
    }

}
