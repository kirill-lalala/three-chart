import * as THREE from "three";

export const generatePoints = (step, xMin, xMax, yMin, yMax) => {
    const count = Math.round((xMax - xMin) / step);
    let x = xMin;
    const arr = [{ x: xMin, y: yMin }];
    [...Array(count).keys()].forEach(() => {
        arr.push({
            x: x += step,
            y: THREE.Math.randFloat(yMin, yMax)
        })
    });
    arr.push({  x: xMax, y: yMin })

    return arr;
}
