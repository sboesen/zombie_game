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
        result: new Item('Molotov Cocktail', 'Throwable weapon. Creates a fire area that deals 10 damage per turn to all zombies within. Lasts for 5 turns. 25% chance to spread to adjacent areas.', 'weapon', 10, 1, 'Creates a fire area that deals 10 damage per turn to all zombies within. Lasts for 5 turns. 25% chance to spread to adjacent areas.'),
        ingredients: [
            { name: 'Empty Bottle', quantity: 1 },
            { name: 'Gasoline', quantity: 1 },
            { name: 'Rag', quantity: 1 }
        ]
    }
];