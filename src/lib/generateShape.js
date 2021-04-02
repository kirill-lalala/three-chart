import * as THREE from "three";

export const generateShape = (scene, step, xMin, xMax, yMin, yMax, ) => {
    const count = Math.round((xMax - xMin) / step);
    let x = xMin;

    const shape = new THREE.Shape().moveTo( x, yMin);
    [...Array(count).keys()].forEach(() => {
        const y = THREE.Math.randFloat(yMin, yMax);
        shape.lineTo( x += step, y);
        const geometry = new THREE.CircleGeometry(0.04, 24);

        const material = new THREE.MeshBasicMaterial( { color: 'aqua' } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y);
        scene.add( circle );
    });
    shape.lineTo( xMax, yMin);

    return shape;
}
