import * as THREE from "three";
import { generateShape } from "../lib/generateShape";

export class ChartService {
    constructor(canvas) {
        this.canvas = canvas;
    }

    _createScene() {
        this.scene = new THREE.Scene();
    }

    _createCamera() {
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera( 40, aspectRatio, 1, 1000 );
        this.camera.position.set(0, 2, 10);
    }

    _createRenderer() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    _addGridHelper() {
        this.scene.add(new THREE.GridHelper( 20, 20 ));
    }

    createChart() {
        this._createScene();
        this._createCamera();
        this._createRenderer();
        this._addGridHelper();

        const group = new THREE.Group();
        const shape = generateShape( 0.05, -5, 5, -0.5, 3);
        shape.autoClose = false;
        const geometry = new THREE.ShapeGeometry( shape );
        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xf00000} ) );

        group.add( mesh );

        const points = shape.getPoints();
        const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 'aqua'} ) );
        group.add( line );

        this.scene.add(group)
        this.renderer.render(this.scene, this.camera);
    }
}

