import * as THREE from "three";
import './style.css'
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias:true , alpha:true});

let hlight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(hlight)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth camera movement
controls.dampingFactor = 0.7; // Adjust the damping factor for the camera movement speed
controls.screenSpacePanning = true; // Allow panning in screen space rather than model space

camera.position.z = 5;
camera.lookAt( 0, 0, 0 );
camera.position.set(0 , 3 , 50);


function animate() {
  requestAnimationFrame(animate)
  controls.update();
  renderer.render(scene, camera);
}  



const loader = new GLTFLoader()

loader.load('./source/pc.glb' , (gltf)=>{
  const pc =gltf.scene
  pc.traverse((child) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide;
    }
  });



  scene.add(pc);
  camera.position.set(0,5,10)
  controls.target.copy(pc.position)

  zoomIn(pc)
  
}, undefined , (err)=>{
console.log(err);
})

function zoomIn(object) {
  const box = new THREE.Box3().setFromObject(object); // Calculate the bounding box of the house object
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere); // Calculate the bounding sphere of the house object

  const target = sphere.center; // Set the target to the center of the bounding sphere
  const distance = sphere.radius * 2; // Calculate the distance based on the diameter of the bounding sphere
  const maxZoomDistance = 100
  const maxDistance = Math.min(distance, maxZoomDistance);
  
  camera.position.copy(target).add(new THREE.Vector3(0, 0, maxDistance));
  controls.target.copy(target);
  
}


// render 
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();
  
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
