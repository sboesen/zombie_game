import { Item } from '../game/Item';
import { CraftingRecipe } from '../game/CraftingRecipe';

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
    {
        name: 'Water Purifier',
        components: [
            { name: 'Plastic Container', quantity: 1 },
            { name: 'Charcoal', quantity: 1 },
            { name: 'Sand', quantity: 1 },
            { name: 'Cloth', quantity: 1 }
        ],
        result: { name: 'Water Purifier', type: 'tool', description: 'Purifies contaminated water. Each use has a 90% chance to produce clean water. Durability: 20/20.', quantity: 1 },
        ingredients: [
            { name: 'Plastic Container', quantity: 1 },
            { name: 'Charcoal', quantity: 1 },
            { name: 'Sand', quantity: 1 },
            { name: 'Cloth', quantity: 1 }
        ]
    },
    {
        name: 'Lockpick',
        components: [
            { name: 'Hairpin', quantity: 1 },
            { name: 'File', quantity: 1 }
        ],
        result: { name: 'Lockpick', type: 'tool', description: 'Single-use tool. Allows one attempt to open a locked door or container. 50% success rate, modified by player\'s skill.', quantity: 1 },
        ingredients: [
            { name: 'Hairpin', quantity: 1 },
            { name: 'File', quantity: 1 }
        ]
    },
    {
        name: 'Bandage',
        components: [
            { name: 'Clean Cloth', quantity: 1 },
            { name: 'Alcohol', quantity: 1 }
        ],
        result: { name: 'Bandage', type: 'healing', description: 'Stops bleeding and restores 20 health. Single-use.', quantity: 1 },
        ingredients: [
            { name: 'Clean Cloth', quantity: 1 },
            { name: 'Alcohol', quantity: 1 }
        ]
    },
    {
        name: 'Silencer',
        components: [
            { name: 'Metal Pipe', quantity: 1 },
            { name: 'Foam', quantity: 1 },
            { name: 'Duct Tape', quantity: 1 }
        ],
        result: { name: 'Silencer', type: 'attachment', description: 'Reduces noise of gun shots by 75%. Durability: 10/10. Each shot reduces durability by 1.', quantity: 1 },
        ingredients: [
            { name: 'Metal Pipe', quantity: 1 },
            { name: 'Foam', quantity: 1 },
            { name: 'Duct Tape', quantity: 1 }
        ]
    },
    {
        name: 'Fortified Armor',
        components: [
            { name: 'Leather Jacket', quantity: 1 },
            { name: 'Duct Tape', quantity: 1 },
            { name: 'Metal Scraps', quantity: 1 }
        ],
        result: { name: 'Fortified Armor', type: 'armor', description: 'Reduces damage taken by 20%. Durability: 150/150. Each hit reduces durability by 1-7 points.', quantity: 1 },
        ingredients: [
            { name: 'Leather Jacket', quantity: 1 },
            { name: 'Duct Tape', quantity: 1 },
            { name: 'Metal Scraps', quantity: 1 }
        ]
    },
    {
        name: 'Crossbow',
        components: [
            { name: 'Wood', quantity: 1 },
            { name: 'Metal Pipe', quantity: 1 },
            { name: 'Strong String', quantity: 1 },
            { name: 'Screws', quantity: 1 }
        ],
        result: { name: 'Crossbow', type: 'weapon', description: 'Ranged weapon. Deals 30 damage. Silent. Requires bolts. Can recover bolts from killed enemies with a 75% chance.', quantity: 1 },
        ingredients: [
            { name: 'Wood', quantity: 1 },
            { name: 'Metal Pipe', quantity: 1 },
            { name: 'Strong String', quantity: 1 },
            { name: 'Screws', quantity: 1 }
        ]
    },
    {
        name: 'Flare',
        components: [
            { name: 'Empty Can', quantity: 1 },
            { name: 'Chemicals', quantity: 1 },
            { name: 'Cloth', quantity: 1 }
        ],
        result: { name: 'Flare', type: 'tool', description: 'Illuminates a large area for 10 turns. Attracts zombies from 2 adjacent areas.', quantity: 1 },
        ingredients: [
            { name: 'Empty Can', quantity: 1 },
            { name: 'Chemicals', quantity: 1 },
            { name: 'Cloth', quantity: 1 }
        ]
    },
    {
        name: 'Smoke Bomb',
        components: [
            { name: 'Empty Can', quantity: 1 },
            { name: 'Chemicals', quantity: 1 },
            { name: 'Fuse', quantity: 1 }
        ],
        result: { name: 'Smoke Bomb', type: 'tactical', description: 'Creates a smoke screen in the current and adjacent areas for 3 turns. Reduces zombie accuracy by 50%.', quantity: 1 },
        ingredients: [
            { name: 'Empty Can', quantity: 1 },
            { name: 'Chemicals', quantity: 1 },
            { name: 'Fuse', quantity: 1 }
        ]
    },
    {
        name: 'Rain Catcher',
        components: [
            { name: 'Tarp', quantity: 1 },
            { name: 'Bucket', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ],
        result: { name: 'Rain Catcher', type: 'structure', description: 'Passively collects 1-3 units of clean water per day, depending on weather.', quantity: 1 },
        ingredients: [
            { name: 'Tarp', quantity: 1 },
            { name: 'Bucket', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ]
    },
    {
        name: 'Spear',
        components: [
            { name: 'Long Stick', quantity: 1 },
            { name: 'Knife', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ],
        result: { name: 'Spear', type: 'weapon', description: 'Deals 20 damage with increased range. 25% chance to keep zombies at bay, preventing their attack for one turn. Durability: 30/30.', quantity: 1 },
        ingredients: [
            { name: 'Long Stick', quantity: 1 },
            { name: 'Knife', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ]
    },
    {
        name: 'Alarm Trap',
        components: [
            { name: 'Alarm Clock', quantity: 1 },
            { name: 'Tripwire', quantity: 1 },
            { name: 'Batteries', quantity: 1 }
        ],
        result: { name: 'Alarm Trap', type: 'trap', description: 'When triggered, creates loud noise attracting zombies. Can be used defensively or as a distraction.', quantity: 1 },
        ingredients: [
            { name: 'Alarm Clock', quantity: 1 },
            { name: 'Tripwire', quantity: 1 },
            { name: 'Batteries', quantity: 1 }
        ]
    },
    {
        name: 'Herbal Medicine',
        components: [
            { name: 'Various Herbs', quantity: 1 },
            { name: 'Alcohol', quantity: 1 },
            { name: 'Cheesecloth', quantity: 1 }
        ],
        result: { name: 'Herbal Medicine', type: 'medicine', description: 'Boosts immune system, reducing chance of infection by 50% for 5 turns.', quantity: 1 },
        ingredients: [
            { name: 'Various Herbs', quantity: 1 },
            { name: 'Alcohol', quantity: 1 },
            { name: 'Cheesecloth', quantity: 1 }
        ]
    },
    {
        name: 'Makeshift Tent',
        components: [
            { name: 'Tarp', quantity: 1 },
            { name: 'Rope', quantity: 1 },
            { name: 'Sticks', quantity: 1 }
        ],
        result: { name: 'Makeshift Tent', type: 'structure', description: 'Provides a safe resting place. Increases healing rate by 25% when sleeping. Durability: 50/50.', quantity: 1 },
        ingredients: [
            { name: 'Tarp', quantity: 1 },
            { name: 'Rope', quantity: 1 },
            { name: 'Sticks', quantity: 1 }
        ]
    },
    {
        name: 'Firestarter',
        components: [
            { name: 'Magnifying Glass', quantity: 1 },
            { name: 'Dry Grass', quantity: 1 },
            { name: 'Small Container', quantity: 1 }
        ],
        result: { name: 'Firestarter', type: 'tool', description: 'Allows starting fires without matches or a lighter. 75% success rate, modified by weather conditions.', quantity: 1 },
        ingredients: [
            { name: 'Magnifying Glass', quantity: 1 },
            { name: 'Dry Grass', quantity: 1 },
            { name: 'Small Container', quantity: 1 }
        ]
    },
    {
        name: 'Ghillie Suit',
        components: [
            { name: 'Burlap Sack', quantity: 1 },
            { name: 'Local Vegetation', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ],
        result: { name: 'Ghillie Suit', type: 'stealth', description: 'Reduces chance of being detected by zombies by 50% when not moving.', quantity: 1 },
        ingredients: [
            { name: 'Burlap Sack', quantity: 1 },
            { name: 'Local Vegetation', quantity: 1 },
            { name: 'Rope', quantity: 1 }
        ]
    },
    {
        name: 'Noise Maker',
        components: [
            { name: 'Empty Cans', quantity: 1 },
            { name: 'Pebbles', quantity: 1 },
            { name: 'String', quantity: 1 }
        ],
        result: { name: 'Noise Maker', type: 'tactical', description: 'Can be thrown to create a distraction. Attracts zombies within 2 areas for 5 turns.', quantity: 1 },
        ingredients: [
            { name: 'Empty Cans', quantity: 1 },
            { name: 'Pebbles', quantity: 1 },
            { name: 'String', quantity: 1 }
        ]
    },
    {
        name: 'Makeshift Radio',
        components: [
            { name: 'Electronic Parts', quantity: 1 },
            { name: 'Wires', quantity: 1 },
            { name: 'Batteries', quantity: 1 },
            { name: 'Metal Case', quantity: 1 }
        ],
        result: { name: 'Makeshift Radio', type: 'communication', description: 'Allows receiving emergency broadcasts and contacting distant NPCs. Requires batteries.', quantity: 1 },
        ingredients: [
            { name: 'Electronic Parts', quantity: 1 },
            { name: 'Wires', quantity: 1 },
            { name: 'Batteries', quantity: 1 },
            { name: 'Metal Case', quantity: 1 }
        ]
    },
    {
        name: 'Reinforced Door',
        components: [
            { name: 'Wooden Door', quantity: 1 },
            { name: 'Metal Sheets', quantity: 1 },
            { name: 'Screws', quantity: 1 },
            { name: 'Tools', quantity: 1 }
        ],
        result: { name: 'Reinforced Door', type: 'structure', description: 'Increases durability of a base entrance by 200%. Takes 3 turns to install.', quantity: 1 },
        ingredients: [
            { name: 'Wooden Door', quantity: 1 },
            { name: 'Metal Sheets', quantity: 1 },
            { name: 'Screws', quantity: 1 },
            { name: 'Tools', quantity: 1 }
        ]
    }
];