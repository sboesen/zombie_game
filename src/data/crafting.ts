import { Item } from '../models/Item';

export interface CraftingComponent {
    name: string;
    quantity: number;
}

export interface CraftingRecipe {
    name: string;
    components: CraftingComponent[];
    result: Item; // Ensure this line is present
    ingredients: CraftingComponent[]; // Ensure this line is present
}

export const craftingRecipes: CraftingRecipe[] = [
    {
        name: 'Molotov Cocktail',
        components: [
            { name: 'Empty Bottle', quantity: 1 },
            { name: 'Gasoline', quantity: 1 },
            { name: 'Rag', quantity: 1 }
        ],
        result: { name: 'Molotov Cocktail', type: 'weapon', description: 'Throwable weapon. Creates a fire area that deals 10 damage per turn to all zombies within. Lasts for 5 turns. 25% chance to spread to adjacent areas.', quantity: 1 },
        ingredients: [
            { name: 'Empty Bottle', quantity: 1 },
            { name: 'Gasoline', quantity: 1 },
            { name: 'Rag', quantity: 1 }
        ]
    },
    {
        name: 'Nail Bat',
        components: [
            { name: 'Baseball Bat', quantity: 1 },
            { name: 'Nails', quantity: 10 },
            { name: 'Duct Tape', quantity: 1 }
        ],
        result: { name: 'Nail Bat', type: 'weapon', description: 'Upgraded melee weapon. Deals 30 damage with a 40% chance to cause bleeding. Durability: 40/40.', quantity: 1 },
        ingredients: [
            { name: 'Baseball Bat', quantity: 1 },
            { name: 'Nails', quantity: 10 },
            { name: 'Duct Tape', quantity: 1 }
        ]
    },
    // Add other recipes here...
];