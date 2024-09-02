export interface Item {
    name: string;
    type: string;
    effect?: number; // Example property
    durability?: number; // Optional for general items
    maxDurability?: number; // Optional for general items
    ammoType?: string; // Optional for weapons
    description?: string; // Include description if needed
    quantity?: number; // Optional for general items
}