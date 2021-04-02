import * as THREE from "three";

export const generateShape = (points) => {
    const [firstPoint] = points;
    const shape = new THREE.Shape().moveTo( firstPoint.x, firstPoint.y);

    points.forEach(({ x, y }) => {
        shape.lineTo(x, y);
    });

    return shape;
}
