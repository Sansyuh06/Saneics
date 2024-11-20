import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load 3D Model
const loader = new GLTFLoader();
loader.load(
    'assets/3d/your-model.glb',
    function (gltf) {
        const model = gltf.scene;
        model.rotation.x = -0.5; // Adjust the initial rotation
        model.rotation.y = 0;
        scene.add(model);

        // Rotate the model on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY / window.innerHeight;
            model.rotation.y = scrollY * Math.PI * 2;
        });
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

// Render the Scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
