export function initControls(camera){

document.body.addEventListener("click",()=>{
document.body.requestPointerLock();
});

let pitch=0,yaw=0;

document.addEventListener("mousemove",e=>{
if(document.pointerLockElement===document.body){

yaw-=e.movementX*0.002;
pitch-=e.movementY*0.002;

pitch=Math.max(-Math.PI/2,
Math.min(Math.PI/2,pitch));

camera.rotation.set(pitch,yaw,0);
}
});

}
