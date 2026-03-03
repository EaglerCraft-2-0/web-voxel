import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { initWorld } from "./world.js";
import { initPlayer } from "./player.js";
import { initControls } from "./controls.js";
import { initNetwork } from "./network.js";

export let scene;
export let camera;
export let renderer;

async function init(){

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff,0.6));

let light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(100,200,100);
scene.add(light);

// Systems
await initWorld(scene);
initPlayer(camera);
initControls(camera);
initNetwork();

animate();
}

function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}

init();
