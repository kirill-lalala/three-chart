import * as THREE from "three";
import { Interaction } from 'three.interaction';
import { generateShape } from "../lib/generateShape";
import {generatePoints} from "../lib/generatePoints";
import {addCircles} from "../lib/addCircles";

export class ChartService {
    INTERSECTED;
    LINE_COLOR = 0x00FFFF;
    CHART_COLOR = 0xFF0000;

    constructor(canvas) {
        this.canvas = canvas;
    }

    _createScene() {
        this.scene = new THREE.Scene();
    }

    _createCamera() {
        const aspectRatio = window.innerWidth / window.innerHeight;
       this.camera = new THREE.OrthographicCamera( -3 * aspectRatio, 3 * aspectRatio, 5, -1, 1, 1000 );
       this.scene.add(this.camera );

    }

    _createRenderer() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
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
        this.scene.add(this.camera );
        new Interaction(this.renderer, this.scene, this.camera);

        const points = generatePoints(0.05, -5, 5, -0.5, 3);
        const shape = generateShape(points);
        const circles = addCircles(points, this.scene);

        const geometry = new THREE.ShapeGeometry( shape );
        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 'red'} ) );
        mesh.position.z = -10;
        this.scene.add( mesh );

        const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 'aqua'} ) );
        line.position.z = -10;
        this.scene.add( line );

        mesh.on('mouseout', () => {
            circles.forEach((p) => {
                p.material.color.setHex(this.LINE_COLOR);
            })
            mesh.material.color.setHex(this.CHART_COLOR);
            line.material.color.setHex(this.LINE_COLOR);
        });

        mesh.on('mousemove', () => {
            circles.forEach((p) => {
                p.material.color.setHex(this.CHART_COLOR);
            })
            mesh.material.color.setHex(this.LINE_COLOR);
            line.material.color.setHex(this.CHART_COLOR);
        });

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render);
    }
}
