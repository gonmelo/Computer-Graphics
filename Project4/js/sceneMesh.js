'use strict'

class SceneMesh extends THREE.Mesh {

  constructor( bM, pM = null, lM = null, geometry ) {

    super(geometry, basicMaterial);

    this.basicMaterial = bM;
    this.phongMaterial = pM;
    this.lambertMaterial = lM;
  }

}
