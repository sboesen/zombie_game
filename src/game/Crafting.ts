import { Item } from '../game/Item'; // Update the import path
import { Player } from './Player'; // Import Player instead of Game
import { addMessage } from '../utils/ui';
import { CraftingComponent } from './CraftingComponent';
import { CraftingRecipe } from './CraftingRecipe';

// Import craftingRecipes from the data file
import { craftingRecipes } from '../data/crafting';

export { craftingRecipes };

export function craft(player: Player, recipeName: string): void {
    const recipe = craftingRecipes.find(r => r.name === recipeName);
    if (!recipe) {
        addMessage(`Recipe for ${recipeName} not found.`);
        return;
    }

    // Check if player has all required components
    for (const component of recipe.components) {
        if (getItemQuantity(player, component.name) < component.quantity) {
            addMessage(`Not enough ${component.name} to craft ${recipeName}.`);
            return;
        }
    }

    // Remove components from inventory
    for (const component of recipe.components) {
        removeItems(player, component.name, component.quantity);
    }

    // Add crafted item to inventory
    player.inventory.push(recipe.result);

    addMessage(`Successfully crafted ${recipeName}.`);
}

function getItemQuantity(player: Player, itemName: string): number {
    return player.inventory.filter((item) => item.name === itemName).length;
}

function removeItems(player: Player, itemName: string, quantity: number): void {
    for (let i = 0; i < quantity; i++) {
        const index = player.inventory.findIndex((item) => item.name === itemName);
        if (index !== -1) {
            player.inventory.splice(index, 1);
        }
    }
}

// ... (keep other crafting-related functions)