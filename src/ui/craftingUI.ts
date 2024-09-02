import { Game } from '../game';
import { craftingRecipes } from '../data/crafting';
import { items } from '../data/items'; // Assuming you have an items data file

export function createCraftingModal(game: Game): string {
    const playerInventory = game.getPlayer().inventory;

    const recipeRows = craftingRecipes.map(recipe => {
        const canCraft = recipe.components.every(component => {
            const item = playerInventory.find(i => i.name === component.name);
            return item && item.quantity >= component.quantity;
        });

        const craftableCount = Math.min(
            ...recipe.components.map(component => {
                const item = playerInventory.find(i => i.name === component.name);
                return item ? Math.floor(item.quantity / component.quantity) : 0;
            })
        );

        const componentList = recipe.components.map(component => {
            const item = playerInventory.find(i => i.name === component.name);
            const hasEnough = item && item.quantity >= component.quantity;
            const itemData = items.find(i => i.name === component.name);
            const description = itemData ? itemData.description : 'No description available';
            const farmLocation = itemData ? itemData.farmLocation : 'Unknown location';
            return `<span class="${hasEnough ? 'text-green-500' : 'text-red-500'}" title="${description}\nFarm: ${farmLocation}">${component.quantity}x ${component.name}</span>`;
        }).join(', ');

        return `
            <tr class="border-b border-gray-700">
                <td class="text-gray-300 text-sm p-2">${recipe.name}</td>
                <td class="text-gray-300 text-sm p-2">${componentList}</td>
                <td class="text-gray-300 text-sm p-2 text-center">${canCraft ? craftableCount : 0}</td>
                <td class="text-center p-2">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm ${canCraft ? '' : 'opacity-50 cursor-not-allowed'}" ${canCraft ? `onclick="game.craft('${recipe.name}')"` : 'disabled'}>Craft</button>
                </td>
            </tr>
        `;
    }).join('');

    return `
        <div id="crafting-modal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center hidden">
            <div class="bg-gray-800 p-6 rounded w-3/4">
                <h2 class="text-2xl font-bold mb-4">Crafting Menu</h2>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-gray-700">
                            <th class="text-gray-400 text-sm p-2">Item</th>
                            <th class="text-gray-400 text-sm p-2">Components</th>
                            <th class="text-gray-400 text-sm p-2 text-center">Craftable</th>
                            <th class="text-gray-400 text-sm p-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recipeRows}
                    </tbody>
                </table>
                <button id="close-crafting" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
            </div>
        </div>
    `;
}

export function setupCraftingModal(game: Game): void {
    document.body.insertAdjacentHTML('beforeend', createCraftingModal(game));

    document.getElementById('close-crafting')?.addEventListener('click', () => game.closeCraftingMenu());
}