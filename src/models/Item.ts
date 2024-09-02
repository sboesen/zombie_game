export interface Item {
    name: string;
    type: string;
    effect?: number; // Example property
    description?: string; // Include description if needed
    quantity?: number; // Add this line to include quantity
}

export interface Tool extends Item {
    durability: number; // Specific to tools
}

export interface Weapon extends Item {
    ammoType: string; // Specific to weapons
    durability: number; // Specific to weapons
}

// Example of creating a flashlight item
const flashlight: Tool = {
    name: "Flashlight",
    type: "tool",
    durability: 5, // Set durability
    // other properties...
};