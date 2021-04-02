import * as THREE from "three";
import { Interaction } from 'three.interaction';
import { generateShape } from "../lib/generateShape";

export class ChartService {
    INTERSECTED;

    constructor(canvas) {
        this.canvas = canvas;
    }

    _createScene() {
        this.scene = new THREE.Scene();
    }

    _createCamera() {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const width = window.innerWidth;
        const height = window.innerHeight;
        // this.camera = new THREE.PerspectiveCamera( 40, aspectRatio, 1, 1000 );
        // this.camera.position.set(0, 2, 10);
       this.camera = new THREE.OrthographicCamera( -5, 5, 7, -3, 0.01, 1000 );
       this.camera.zoom = 0.2;
       this.camera.updateProjectionMatrix();
       this.scene.add(this.camera );

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

    _onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    render = () => {
        this.camera.updateMatrixWorld()

        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render);
    }

    createChart() {
        this._createScene();
        this._createCamera();
        this._createRenderer();
        // this._addGridHelper();

        // const interaction = new Interaction(this.renderer, this.scene, this.camera);

        const shape = generateShape(this.scene, 0.05, -5, 5, -0.5, 3);
        const geometry = new THREE.ShapeGeometry( shape );
        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 'red'} ) );

        this.scene.add( mesh );

        // mesh.on('mousemove', function(ev) { console.log(ev) });

        const points = shape.getPoints();
        const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 'aqua'} ) );
        this.scene.add( line );
        // line.on('mousemove', function(ev) { console.log('line') });

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render);
    }
}
