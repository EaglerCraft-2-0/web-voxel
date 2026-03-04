import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { player } from "./player.js";

export function initControls(camera){

document.body.addEventListener("click",()=>{
document.body.requestPointerLock();
});

let pitch=0;
let yaw=0;
let keys={};

document.addEventListener("keydown",e=>{
keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup",e=>{
keys[e.key.toLowerCase()] = false;
});

document.addEventListener("mousemove",e=>{
if(document.pointerLockElement===document.body){

yaw -= e.movementX * 0.002;
pitch -= e.movementY * 0.002;

pitch = Math.max(-Math.PI/2+0.01,
                 Math.min(Math.PI/2-0.01,pitch));

camera.quaternion.setFromEuler(
new THREE.Euler(pitch,yaw,0,"YXZ")
);

player.rotation.y = yaw; // Player döndür
}
});

function movement(){

const speed = 0.2;

let forward = new THREE.Vector3(0,0,-1)
.applyQuaternion(player.quaternion)
.setY(0)
.normalize();

let right = new THREE.Vector3(1,0,0)
.applyQuaternion(player.quaternion)
.setY(0)
.normalize();

if(keys["w"]) player.position.addScaledVector(forward,speed);
if(keys["s"]) player.position.addScaledVector(forward,-speed);
if(keys["a"]) player.position.addScaledVector(right,-speed);
if(keys["d"]) player.position.addScaledVector(right,speed);

requestAnimationFrame(movement);
}

movement();
}
