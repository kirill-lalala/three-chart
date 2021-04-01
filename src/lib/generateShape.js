import * as THREE from "three";

export const generateShape = (step, xMin, xMax, yMin, yMax) => {
    const count = Math.round((xMax - xMin) / step);
    let x = xMin;

    const shape = new THREE.Shape().moveTo( x, yMin);
    [...Array(count).keys()].forEach(() => {
        const y = THREE.Math.randFloat(yMin, yMax);
        shape.lineTo( x += step, y);
    });
    shape.lineTo( xMax, yMin);

    return shape;
}
