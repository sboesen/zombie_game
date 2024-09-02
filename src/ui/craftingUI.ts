import { Game } from '../game';
import { CraftingRecipe } from '../game/CraftingRecipe';
import { items } from '../data/items'; // Assuming you have an items data file
import { Item } from '../models/Item'; // Ensure Item is imported
import { CraftingComponent } from '../game/CraftingComponent';
import { craftingRecipes } from '../data/crafting';

function categorizeRecipes(): { [key: string]: CraftingRecipe[] } {
    const categories: { [key: string]: CraftingRecipe[] } = {
        'Weapons/Armor': [],
        'Tools/Equipment': [],
        'Medical': [],
        'Structures': [],
        'Miscellaneous': []
    };

    craftingRecipes.forEach((recipe: CraftingRecipe) => {
        if (['weapon', 'armor'].includes(recipe.result.type)) {
            categories['Weapons/Armor'].push(recipe);
        } else if (['tool', 'equipment', 'attachment', 'tactical', 'communication'].includes(recipe.result.type)) {
            categories['Tools/Equipment'].push(recipe);
        } else if (recipe.result.type === 'medicine' || recipe.result.type === 'healing') {
            categories['Medical'].push(recipe);
        } else if (recipe.result.type === 'structure') {
            categories['Structures'].push(recipe);
        } else {
            categories['Miscellaneous'].push(recipe);
        }
    });

    return categories;
}

function createRecipeRows(recipes: CraftingRecipe[], playerInventory: Item[]): string {
    return recipes.map((recipe: CraftingRecipe) => {
        const canCraft = recipe.components.every((component: CraftingComponent) => {
            const item = playerInventory.find(i => i.name === component.name);
            return item && item.quantity !== undefined && item.quantity >= component.quantity;
        });

        const craftableCount = Math.min(
            ...recipe.components.map((component: CraftingComponent) => {
                const item = playerInventory.find(i => i.name === component.name);
                return item ? Math.floor(item.quantity ?? 0 / component.quantity) : 0; // Use 0 if item.quantity is undefined
            })
        );

        const componentList = recipe.components.map((component: CraftingComponent) => {
            const item = playerInventory.find(i => i.name === component.name);
            const hasEnough = item && item.quantity !== undefined && item.quantity >= component.quantity;
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
}

export function createCraftingModal(game: Game): string {
    const playerInventory = game.getPlayer().inventory;
    const categories = categorizeRecipes();

    const tabs = Object.keys(categories).map(category => `
        <button class="tablinks" onclick="openTab(event, '${category}')">${category}</button>
    `).join('');

    const tabContents = Object.keys(categories).map(category => `
        <div id="${category}" class="tabcontent hidden">
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
                    ${createRecipeRows(categories[category], playerInventory)}
                </tbody>
            </table>
        </div>
    `).join('');

    return `
        <div id="crafting-modal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center hidden">
            <div class="bg-gray-800 p-6 rounded w-3/4 max-h-full overflow-y-auto relative">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Crafting Menu</h2>
                    <button id="close-crafting" class="text-white text-2xl">&times;</button>
                </div>
                <div class="tab">
                    ${tabs}
                </div>
                ${tabContents}
            </div>
        </div>
    `;
}

export function setupCraftingModal(game: Game): void {
    document.body.insertAdjacentHTML('beforeend', createCraftingModal(game));

    const modal = document.getElementById('crafting-modal');
    const closeModal = () => game.closeCraftingMenu();

    document.getElementById('close-crafting')?.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Add event listeners for tab functionality
    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const target = event.currentTarget as HTMLElement;
            const tabName = target.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] ?? 'defaultTab';
            openTab(event as MouseEvent, tabName);
        });
    });

    // Open the first tab by default
    if (tablinks.length > 0) {
        const firstTabName = tablinks[0].getAttribute('onclick')?.match(/'([^']+)'/)?.[1] ?? 'defaultTab';
        openTab({ currentTarget: tablinks[0] } as unknown as MouseEvent, firstTabName);
    }
}

function openTab(event: MouseEvent, tabName: string): void {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(content => content.classList.add('hidden'));

    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(link => link.classList.remove('bg-gray-700'));

    document.getElementById(tabName)?.classList.remove('hidden');
    (event.currentTarget as HTMLElement).classList.add('bg-gray-700');
}