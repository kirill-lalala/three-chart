import * as THREE from "three";
import { Interaction } from 'three.interaction';
import { generateShape } from "../lib/generateShape";
import {generatePoints} from "../lib/generatePoints";
import {addCircles} from "../lib/addCircles";

class ChartService {
    INTERSECTED;
    LINE_COLOR = 0x00FFFF;
    CHART_COLOR = 0xFF0000;

    cursor = {
        x: 0,
        y: 0
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

    onPlusZoomClick = (zoom = 1.1) => {
        if (this.camera.zoom < 4) {
            this.camera.zoom = this.camera.zoom *= zoom;
            this.camera.updateProjectionMatrix();
        }
    }

    onMinusZoomClick = (zoom = 1.1) => {
        if (this.camera.zoom > 1) {
            this.camera.zoom = this.camera.zoom /= zoom;
            this.camera.updateProjectionMatrix()
        }
    }

    render = () => {
        if (this.camera.zoom > 1) {
            this.camera.position.x = this.cursor.x * this.camera.zoom * 5
            this.camera.position.y = this.cursor.y * this.camera.zoom * 5
        } else {
            this.camera.position.x = 0
            this.camera.position.y = 0
        }

        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render);
    }

    createChart(canvas) {
        this.canvas = canvas;
        this._createScene();
        this._createCamera();
        this._createRenderer();

        new Interaction(this.renderer, this.scene, this.camera);

        const points = generatePoints(0.05, -5, 5, -0.5, 3);
        const shape = generateShape(points);
        const circles = addCircles(points, this.scene);

        const geometry = new THREE.ShapeGeometry( shape );
        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: this.CHART_COLOR} ) );
        mesh.position.z = -10;
        this.scene.add( mesh );

        const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: this.LINE_COLOR} ) );
        line.position.z = -10;
        this.scene.add( line );

        mesh.on('mouseout', () => {
            circles.forEach((p) => p.material.color.setHex(this.LINE_COLOR));
            mesh.material.color.setHex(this.CHART_COLOR);
            line.material.color.setHex(this.LINE_COLOR);
        });

        mesh.on('mousemove', () => {
            circles.forEach((p) => p.material.color.setHex(this.CHART_COLOR));
            mesh.material.color.setHex(this.LINE_COLOR);
            line.material.color.setHex(this.CHART_COLOR);
        });

        window.addEventListener('mousemove', (event) => {
            this.cursor.x = event.clientX / window.innerWidth - 0.5
            this.cursor.y = - (event.clientY / window.innerHeight - 0.5)
        })

        window.requestAnimationFrame(this.render);
    }
}

export const chartService = new ChartService();
