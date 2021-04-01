import {useEffect} from 'react';
import * as THREE from 'three';
import './App.css';

const App = () => {
  const randomCoord = (min, max) =>  min - 0.5 + Math.random() * (max - min + 1);

  const generatePoints = (step, xMin, xMax, yMin, yMax) => {
    const count = Math.round((xMax - xMin) / step);
    let x = xMin;

    const path = new THREE.Path();
    path.moveTo( x, randomCoord(yMin, yMax));
    [...Array(count - 1).keys()].forEach(() => {
      const y = randomCoord(yMin, yMax);
      path.lineTo( x += step, y);
    });

    return path.getPoints();
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

    const plane = new THREE.Mesh(planeGeom, new THREE.MeshBasicMaterial({
      color: "red",
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: .75
    }));
    scene.add(plane);

    // axises
    const lineMaterial = new THREE.LineBasicMaterial( { color: "red" } );
    const points = [
      new THREE.Vector3( - 10, 0, 0 ),
      new THREE.Vector3( 10, 0, 0 ),
      new THREE.Vector3( 0, 10, 0 ),
      new THREE.Vector3( 0, -10, 0 ),
    ];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    const axis = new THREE.Line( lineGeometry, lineMaterial );
    // scene.add(axis);

    // char
    const lines = generatePoints( 0.05, -5, 5, -0.5, 3);
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( lines );
    const materialPoints = new THREE.LineBasicMaterial( { color: 'aqua' } );
    const line = new THREE.Line( geometryPoints, materialPoints );
    const geometry = new THREE.BufferGeometry();

    console.log(planeGeom)
    // geometry.vertices.push(planeGeom.vertic);

    scene.add( line );

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
