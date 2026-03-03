// Ken Perlin tabanlı klasik Perlin Noise implementasyonu

export class Perlin {
    constructor() {
        this.permutation = new Uint8Array(512);
        this.p = new Uint8Array(256);

        for (let i = 0; i < 256; i++) {
            this.p[i] = i;
        }

        // Shuffle
        for (let i = 255; i > 0; i--) {
            let n = Math.floor(Math.random() * (i + 1));
            [this.p[i], this.p[n]] = [this.p[n], this.p[i]];
        }

        for (let i = 0; i < 512; i++) {
            this.permutation[i] = this.p[i & 255];
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y, z) {
        let h = hash & 15;
        let u = h < 8 ? x : y;
        let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) +
               ((h & 2) === 0 ? v : -v);
    }

    noise(x, y = 0, z = 0) {
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;
        let Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);

        let A  = this.permutation[X] + Y;
        let AA = this.permutation[A] + Z;
        let AB = this.permutation[A + 1] + Z;
        let B  = this.permutation[X + 1] + Y;
        let BA = this.permutation[B] + Z;
        let BB = this.permutation[B + 1] + Z;

        return this.lerp(w,
            this.lerp(v,
                this.lerp(u,
                    this.grad(this.permutation[AA], x, y, z),
                    this.grad(this.permutation[BA], x - 1, y, z)
                ),
                this.lerp(u,
                    this.grad(this.permutation[AB], x, y - 1, z),
                    this.grad(this.permutation[BB], x - 1, y - 1, z)
                )
            ),
            this.lerp(v,
                this.lerp(u,
                    this.grad(this.permutation[AA + 1], x, y, z - 1),
                    this.grad(this.permutation[BA + 1], x - 1, y, z - 1)
                ),
                this.lerp(u,
                    this.grad(this.permutation[AB + 1], x, y - 1, z - 1),
                    this.grad(this.permutation[BB + 1], x - 1, y - 1, z - 1)
                )
            )
        );
    }
}
