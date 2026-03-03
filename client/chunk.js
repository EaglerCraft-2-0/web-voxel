export class Chunk {
    constructor(cx, cz){
        this.cx = cx;
        this.cz = cz;
        this.size = 16;
        this.blocks = [];
    }

    generate(){
        for(let x=0; x<this.size; x++){
            for(let z=0; z<this.size; z++){
                let worldX = this.cx*this.size + x;
                let worldZ = this.cz*this.size + z;
                let height = Math.floor(Math.sin(worldX*0.2)*2 + Math.cos(worldZ*0.2)*2 + 4);
                for(let y=0; y<height; y++){
                    this.blocks.push({x,y,z});
                }
            }
        }
    }

    async buildMesh(){
        const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
        let geometry = new THREE.BoxGeometry(1,1,1);
        let material = new THREE.MeshStandardMaterial({color:0x55aa55});
        let group = new THREE.Group();

        for(let b of this.blocks){
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                this.cx*this.size + b.x,
                b.y,
                this.cz*this.size + b.z
            );
            group.add(cube);
        }

        this.mesh = group;
    }
}
