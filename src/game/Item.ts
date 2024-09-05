import { items } from '../data/items';

export class Item {
    static findItemByName(loot: string): Item | undefined {
        return items.find(item => item.name === loot);
    }
    constructor(
        public name: string,
        public description: string,
        public type: string,
        public effect: number,
        public quantity: number,
        public textEffect: string
    ) {}
}