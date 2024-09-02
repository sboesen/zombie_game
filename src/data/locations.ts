import { GameLocation } from '../game/Location';
import { Item } from '../game/Item';
import { NPC } from '../game/NPC'; // Ensure this path is correct

export const locations: GameLocation[] = [
    {
        name: 'Abandoned House',
        description: 'A rundown house with broken windows and overgrown yard.',
        items: [
            { name: 'Empty Bottle', description: 'A bottle that can be filled with liquids.', type: 'misc', quantity: 1 },
            { name: 'Rag', description: 'A piece of cloth.', type: 'misc', quantity: 1 }
        ],
        npc: null,
        hasZombie: false // Add hasZombie property
    },
    {
        name: 'Supermarket',
        description: 'A large store with empty shelves and scattered debris.',
        items: [
            { name: 'Canned Food', description: 'A can of preserved food.', type: 'food', effect: 20, quantity: 1 },
            { name: 'Bandage', description: 'A clean cloth for dressing wounds.', type: 'medical', effect: 10, quantity: 1 }
        ],
        npc: null,
        hasZombie: true // Add hasZombie property
    },
    // Add other locations here...
];