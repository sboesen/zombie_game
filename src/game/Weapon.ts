import { Item } from './Item';

export class Weapon implements Item {
    constructor(
        public name: string,
        public description: string,
        public type: string,
        public effect: number,
        public textEffect: string,
        public quantity: number,
        public ammoType: string,
        public durability: number,
        public accuracy: number,
        public damage: number
    ) {}

    attack(): number {
        const hit = Math.random() * 100 < this.accuracy;
        if (hit) {
            return Math.floor(Math.random() * this.damage) + Math.ceil(this.damage / 2);
        }
        return 0;
    }
}