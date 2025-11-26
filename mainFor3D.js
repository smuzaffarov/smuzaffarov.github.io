import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";
import { OrbitControls } from 'https://unpkg.com/three@0.169.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/loader/GLTFLoader.js";

//3D

//Creat a scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Obj variable
let object;

// OrbitControls — to move the camers
let controls;

// 3d Model
let objToRender = 'sphere';

const loader = new GLTFLoader();


// Load the GLTF file
loader.load(
    '3d/scene/scene.gltf',

    // When the file is successfully loaded
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },

    // While loading, show the progress
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // If an error occurs, log it
    function (error) {
        console.error(error);
    }
);

// Create a new WebGL renderer with a transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true }); 
// Set the renderer size to the full window
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement)

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 25 : 500;

// Add lights to the scene so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // top-left-ish direction
topLight.castShadow = true;
scene.add(topLight);

// Add ambient light for softer global lighting
const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1); // stronger light for 'dino'
scene.add(ambientLight);


// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Here you can update the scene, rotate the model, add animations, etc.
    renderer.render(scene, camera);
}

// Adjust the camera and renderer when the window is resized
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();