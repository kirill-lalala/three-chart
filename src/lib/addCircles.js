import * as THREE from "three";

export const addCircles = (points, scene, radius = 0.04, color = 'aqua') => {
    points = points.slice(1, points.length - 1);

    return points.map(({ x, y }, index) => {
        const geometry = new THREE.CircleGeometry(radius, 24);

        const material = new THREE.MeshBasicMaterial( { color: 'aqua' } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, -10);
        scene.add( circle );
        return circle;
    })

}
