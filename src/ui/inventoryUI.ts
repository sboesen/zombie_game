import { Game } from '../game/Game';

export function updateInventoryUI(game: Game): string {
    const player = game.getPlayer();
    return `
        <h3 class="text-lg font-bold mb-2 text-purple-300">Inventory</h3>
        <table class="w-full">
            <thead>
                <tr>
                    <th class="text-left">Item</th>
                    <th class="text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                ${player.inventory.map((item: any) => `
                    <tr>
                        <td class="text-gray-300 item-name" data-item='${JSON.stringify(item)}'>
                            ${item.name}
                            ${item.durability !== undefined ? 
                                `<span class="float-right text-xs text-gray-500">${item.durability}/${item.maxDurability}</span>` : 
                                ''}
                        </td>
                        <td class="text-right">
                            ${['meleeWeapon', 'rangedWeapon', 'armor'].includes(item.type) ? 
                                `<button onclick="game.equipItem('${item.name}')" class="game-button shimmer ml-2 px-2 py-1 bg-blue-700 text-xs rounded">Equip</button>` : 
                                `<button onclick="game.useItem('${item.name}')" class="game-button shimmer ml-2 px-2 py-1 bg-green-700 text-xs rounded">Use</button>`
                            }
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}