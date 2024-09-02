export interface Item {
    name: string;
    type: string;
    description: string;
    quantity: number; // Ensure this line is present
    effect?: number;
    durability?: number;
    maxDurability?: number;
    ammoType?: string;
}