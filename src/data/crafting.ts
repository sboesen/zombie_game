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
        result: new Item('Molotov Cocktail', 'Throwable weapon. Creates a fire area that deals 10 damage per turn to all zombies within. Lasts for 5 turns. 25% chance to spread to adjacent areas.', 'weapon', 10, 1),
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
        result: new Item('Nail Bat', 'Upgraded melee weapon. Deals 30 damage with a 40% chance to cause bleeding. Durability: 40/40.', 'weapon', 30, 1),
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
        result: new Item('Water Purifier', 'Purifies contaminated water. Each use has a 90% chance to produce clean water. Durability: 20/20.', 'tool', 90, 1),
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
        result: new Item('Lockpick', 'Single-use tool. Allows one attempt to open a locked door or container. 50% success rate, modified by player\'s skill.', 'tool', 50, 1),
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
        result: new Item('Bandage', 'Stops bleeding and restores 20 health. Single-use.', 'healing', 20, 1),
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
        result: new Item('Silencer', 'Reduces noise of gun shots by 75%. Durability: 10/10. Each shot reduces durability by 1.', 'attachment', 75, 1),
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
        result: new Item('Fortified Armor', 'Reduces damage taken by 20%. Durability: 150/150. Each hit reduces durability by 1-7 points.', 'armor', 20, 1),
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
        result: new Item('Crossbow', 'Ranged weapon. Deals 30 damage. Silent. Requires bolts. Can recover bolts from killed enemies with a 75% chance.', 'weapon', 30, 1),
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
        result: new Item('Flare', 'Illuminates a large area for 10 turns. Attracts zombies from 2 adjacent areas.', 'tool', 10, 1),
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
        result: new Item('Smoke Bomb', 'Creates a smoke screen in the current and adjacent areas for 3 turns. Reduces zombie accuracy by 50%.', 'tactical', 50, 1),
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
        result: new Item('Rain Catcher', 'Passively collects 1-3 units of clean water per day, depending on weather.', 'structure', 0, 1),
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
        result: new Item('Spear', 'Deals 20 damage with increased range. 25% chance to keep zombies at bay, preventing their attack for one turn. Durability: 30/30.', 'weapon', 20, 1),
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
        result: new Item('Alarm Trap', 'When triggered, creates loud noise attracting zombies. Can be used defensively or as a distraction.', 'trap', 0, 1),
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
        result: new Item('Herbal Medicine', 'Boosts immune system, reducing chance of infection by 50% for 5 turns.', 'medicine', 50, 1),
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
        result: new Item('Makeshift Tent', 'Provides a safe resting place. Increases healing rate by 25% when sleeping. Durability: 50/50.', 'structure', 25, 1),
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
        result: new Item('Firestarter', 'Allows starting fires without matches or a lighter. 75% success rate, modified by weather conditions.', 'tool', 75, 1),
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
        result: new Item('Ghillie Suit', 'Reduces chance of being detected by zombies by 50% when not moving.', 'stealth', 50, 1),
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
        result: new Item('Noise Maker', 'Can be thrown to create a distraction. Attracts zombies within 2 areas for 5 turns.', 'tactical', 0, 1),
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
        result: new Item('Makeshift Radio', 'Allows receiving emergency broadcasts and contacting distant NPCs. Requires batteries.', 'communication', 0, 1),
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
        result: new Item('Reinforced Door', 'Increases durability of a base entrance by 200%. Takes 3 turns to install.', 'structure', 200, 1),
        ingredients: [
            { name: 'Wooden Door', quantity: 1 },
            { name: 'Metal Sheets', quantity: 1 },
            { name: 'Screws', quantity: 1 },
            { name: 'Tools', quantity: 1 }
        ]
    }
];