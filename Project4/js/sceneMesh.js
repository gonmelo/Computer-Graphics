'use strict'

class SceneMesh extends THREE.Mesh {

  constructor(geometry, bM, pM = null, lM = null) {

    super(geometry, basicMaterial);

    this.basicMaterial = bM;
    this.phongMaterial = pM;
    this.lambertMaterial = lM;
  }

}
