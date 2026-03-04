import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export let player;

export function initPlayer(camera){

player = new THREE.Object3D();
player.position.set(0,40,0);

player.add(camera);
camera.position.set(0,1.7,0); // göz yüksekliği

let velocity = new THREE.Vector3();
let onGround = false;

const gravity = -0.02;
const jumpForce = 0.35;

let keys = {};

document.addEventListener("keydown",e=>{
keys[e.key.toLowerCase()] = true;

if(e.key===" " && onGround){
velocity.y = jumpForce;
onGround = false;
}
});

document.addEventListener("keyup",e=>{
keys[e.key.toLowerCase()] = false;
});

function update(){

// Gravity
velocity.y += gravity;
player.position.y += velocity.y;

// Basit zemin kontrolü (terrain height ~ 30)
if(player.position.y < 31){
player.position.y = 31;
velocity.y = 0;
onGround = true;
}

requestAnimationFrame(update);
}

update();

return player;
}
