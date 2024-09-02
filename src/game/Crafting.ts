import { Game } from '../game';
import { addMessage } from '../utils/ui';
import { CraftingRecipe } from '../data/crafting';
import { CraftingComponent } from './CraftingComponent';

export function craft(game: Game, recipeName: string): void {
    const recipe = game.getCraftingRecipes().find(r => r.result.name === recipeName);
    if (!recipe) {
        addMessage(`Unknown recipe: ${recipeName}`);
        return;
    }

    const canCraft = Object.entries(recipe.ingredients).every(([itemName, component]: [string, CraftingComponent]) => {
        const playerItem = game.getPlayer().inventory.find(item => item.name === itemName);
        return playerItem && getItemQuantity(game, itemName) >= component.quantity;
    });

    if (canCraft) {
        Object.entries(recipe.ingredients).forEach(([itemName, component]: [string, CraftingComponent]) => {
            for (let i = 0; i < component.quantity; i++) {
                const index = game.getPlayer().inventory.findIndex(item => item.name === itemName);
                game.getPlayer().inventory.splice(index, 1);
            }
        });
        game.getPlayer().inventory.push(recipe.result);
        addMessage(`You crafted a ${recipe.result.name}!`);
    } else {
        addMessage("You don't have the required ingredients to craft this item.");
    }
    game.advanceTime(2); // Crafting takes 2 hours
}

function getItemQuantity(game: Game, itemName: string): number {
    return game.getPlayer().inventory.filter(item => item.name === itemName).length;
}

const components: [string, CraftingComponent][] = [
    ['wood', { name: 'wood', quantity: 5 }],
    ['metal', { name: 'metal', quantity: 3 }]
];

// Update the filter function to match the correct types
const filteredComponents = components.filter(([itemName, component]) => {
    return component.quantity > 0;
});

// Update the forEach function to match the correct types
components.forEach(([itemName, component]) => {
    console.log(`${component.name}: ${component.quantity}`);
});