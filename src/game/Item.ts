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