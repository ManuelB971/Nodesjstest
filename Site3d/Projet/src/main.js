// Importation de Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Configuration de la scène, caméra et rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Chargement des textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('terre_texture.jpg'); // Texture de la Terre

// Création de la sphère terrestre
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    metalness: 0.1,
    roughness: 1.0,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Génération des étoiles
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000; // Nombre d'étoiles
const positions = [];

for (let i = 0; i < starCount; i++) {
    positions.push(
        (Math.random() - 0.5) * 1000, // Position X
        (Math.random() - 0.5) * 1000, // Position Y
        (Math.random() - 0.5) * 1000  // Position Z
    );
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Couleur des étoiles
    size: 1.5,       // Taille des étoiles
    sizeAttenuation: true // Échelle avec la distance
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Position initiale de la caméra
camera.position.z = 10;

// Gestion du défilement de la souris pour le zoom/dézoom
window.addEventListener('wheel', (event) => {
    const zoomSpeed = 0.1; // Vitesse du zoom
    camera.position.z += event.deltaY * zoomSpeed;
    camera.position.z = Math.max(2, Math.min(camera.position.z, 50)); // Limite entre 2 et 50
});

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Rotation de la Terre
    earth.rotation.y += 0.002; // Rotation lente

    // Rotation des étoiles pour un effet dynamique
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0002;

    renderer.render(scene, camera);
}

// Ajustement de la taille lors du redimensionnement
window.addEventListener('resize', () => {
    renderer.setSize(window.outerWidth, window.outerHeight);
    camera.aspect = window.outerWidth / window.outerHeight;
    camera.updateProjectionMatrix();
});

// Lancer l'animation
animate();
