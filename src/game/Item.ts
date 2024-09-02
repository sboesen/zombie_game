export interface Item {
    name: string;
    type: string;
    effect?: number;
    durability?: number;
    maxDurability?: number;
    ammoType?: string;
    description: string;
    quantity: number;
}

export interface Tool extends Item {
    durability: number;
}

export interface Weapon extends Item {
    ammoType: string;
    durability: number;
}