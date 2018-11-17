'use strict'

class SceneMesh extends THREE.Mesh {

  constructor(geometry, bM, pM, mat) {

    if (mat == 1)
      super(geometry, pM);
    else {
      super(geometry, bM);
    }

    this.basicMaterial = bM;
    this.phongMaterial = pM;
  }

}
