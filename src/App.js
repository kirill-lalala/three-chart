import {useEffect} from 'react';
import * as THREE from 'three';
import './App.css';

const App = () => {
  const randomCoord = (min, max) =>  min - 0.5 + Math.random() * (max - min + 1);

  const generateShape = (step, xMin, xMax, yMin, yMax) => {
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

  useEffect(() => {
    const scene = new THREE.Scene();

    const aspectRatio = window.innerWidth / window.innerHeight
    const camera  = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set(0, 2, 10);

    const canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.GridHelper( 20, 20 ));

    const planeGeom = new THREE.PlaneGeometry(200, 1, 200, 1);
    planeGeom.translate(0, 0, 0);

    // axises
    // const lineMaterial = new THREE.LineBasicMaterial( { color: "red" } );
    // const points = [
    //   new THREE.Vector3( -5, 0, 0 ),
    //   new THREE.Vector3( 5, 0, 0 ),
    //   new THREE.Vector3( 0, 2, 0 ),
    //   new THREE.Vector3( 0, -2, 0 ),
    // ];
    // const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    // const axis = new THREE.Line( lineGeometry, lineMaterial );
    // axis.autoClose = false;
    // scene.add(axis);

    // char
    const group = new THREE.Group();
    const shape = generateShape( 0.05, -5, 5, -0.5, 3);
    shape.autoClose = false;
    let geometry = new THREE.ShapeGeometry( shape );
    const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xf00000} ) );

    group.add( mesh );

    const pointss = shape.getPoints();
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( pointss );
    let line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 'aqua'} ) );
    group.add( line );

    scene.add(group)

    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    }

    const render = () => {
      renderer.render(scene, camera);
    }
  }, [])

  return (
      <canvas id="c" />
  );
}

export default App;
