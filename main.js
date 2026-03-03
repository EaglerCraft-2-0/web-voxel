import { initWorld } from "./world.js";
import { initPlayer } from "./player.js";
import { initControls } from "./controls.js";
import { initNetwork } from "./network.js";

export let scene, camera, renderer;

async function init() {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    let light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(50,100,50);
    scene.add(light);

    await initWorld(scene);
    initPlayer(camera);
    initControls(camera);
    initNetwork();

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
