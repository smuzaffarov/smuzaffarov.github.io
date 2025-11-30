import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/loaders/GLTFLoader.js";



//3D
//Creat a scene
const scene = new THREE.Scene();
//Camera
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

//Obj variable
let object;
// OrbitControls — to move the camers
let controls;
//follow the camera in Blender
let mixer;


const loader = new GLTFLoader();



// Load the GLTF file
loader.load('Cube/Cubescene.gltf',

    // When the file is successfully loaded
    function (gltf) {
        object = gltf.scene;
        scene.add(object);

        mixer = new THREE.AnimationMixer(object);
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, "SphereAction" );
        const action = mixer.clipAction(clip);
        action.play();
    
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


// RENDER
// This renderer uses WebGL 2 to display scenes.
// Create a new WebGL renderer with a transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true }); 
// Set the renderer size to the full window
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("cube3d_2").appendChild(renderer.domElement)
// RENDER END


// CONTROL
controls = new OrbitControls(camera, renderer.domElement);
// To make it static not in the scene //IMPORTANT
controls.enabled = false;
// Set how far the camera will be from the 3D model
camera.position.z = 3;
// CONTROL END


// LIGHTS
// Add lights to the scene so we can actually see the 3D model
const directionalLight  = new THREE.DirectionalLight(0xffffff, 0.1); // (color, intensity)
directionalLight.position.set(500, 500, 500); // top-left-ish direction
directionalLight.shadow = true;
scene.add(directionalLight);
// This light globally illuminates all objects in the scene equally
// Add ambient light for softer global lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // (color, intensity)
scene.add(ambientLight);
// LIGHTS END

const clock = new THREE.Clock();
// Render the scene with rotation
function animate() {
    requestAnimationFrame(animate);

    mixer.update(clock.getDelta())
    renderer.render(scene, camera);
}

// Adjust the camera and renderer when the window is resized
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();