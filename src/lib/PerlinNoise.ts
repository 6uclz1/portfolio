export class PerlinNoise {
    private gradients: Map<string, [number, number]>;
    private permutation: number[];

    constructor() {
        this.gradients = new Map();
        this.permutation = this.generatePermutationTable();
    }

    private generatePermutationTable(): number[] {
        const table = Array.from({ length: 256 }, (_, i) => i);
        for (let i = table.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [table[i], table[j]] = [table[j], table[i]];
        }
        return table.concat(table);
    }

    private getGradient(ix: number, iy: number): [number, number] {
        const key = `${ix},${iy}`;
        if (!this.gradients.has(key)) {
            const angle = Math.random() * 2 * Math.PI;
            this.gradients.set(key, [Math.cos(angle), Math.sin(angle)]);
        }
        return this.gradients.get(key)!;
    }

    private dotGridGradient(ix: number, iy: number, x: number, y: number): number {
        const gradient = this.getGradient(ix, iy);
        const dx = x - ix;
        const dy = y - iy;
        return gradient[0] * dx + gradient[1] * dy;
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(a: number, b: number, t: number): number {
        return a + t * (b - a);
    }

    public noise(x: number, y: number): number {
        const x0 = Math.floor(x);
        const x1 = x0 + 1;
        const y0 = Math.floor(y);
        const y1 = y0 + 1;

        const sx = this.fade(x - x0);
        const sy = this.fade(y - y0);

        const n0 = this.dotGridGradient(x0, y0, x, y);
        const n1 = this.dotGridGradient(x1, y0, x, y);
        const ix0 = this.lerp(n0, n1, sx);

        const n2 = this.dotGridGradient(x0, y1, x, y);
        const n3 = this.dotGridGradient(x1, y1, x, y);
        const ix1 = this.lerp(n2, n3, sx);

        return this.lerp(ix0, ix1, sy);
    }
}
