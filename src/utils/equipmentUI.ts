import { Game } from '../game';

export function updateEquipmentUI(game: Game): string {
    const player = game.getPlayer();
    const ammoTypes = Object.entries(player.ammo).filter(([_, amount]) => amount > 0);

    return `
        <h3 class="text-lg font-bold mb-2 text-blue-300">Equipment</h3>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <p class="text-gray-400">Melee Weapon:</p>
                ${player.equipment.meleeWeapon ? 
                    `<p class="text-white">${player.equipment.meleeWeapon.name}</p>
                     <button onclick="game.unequipItem('meleeWeapon')" class="text-xs text-red-500">Unequip</button>` : 
                    '<p class="text-gray-600">None</p>'}
            </div>
            <div>
                <p class="text-gray-400">Ranged Weapon:</p>
                ${player.equipment.rangedWeapon ? 
                    `<p class="text-white">${player.equipment.rangedWeapon.name}</p>
                     <button onclick="game.unequipItem('rangedWeapon')" class="text-xs text-red-500">Unequip</button>` : 
                    '<p class="text-gray-600">None</p>'}
            </div>
            <div>
                <p class="text-gray-400">Armor:</p>
                ${player.equipment.armor ? 
                    `<p class="text-white">${player.equipment.armor.name}</p>
                     <button onclick="game.unequipItem('armor')" class="text-xs text-red-500">Unequip</button>` : 
                    '<p class="text-gray-600">None</p>'}
            </div>
            <div>
                <p class="text-gray-400">Ammo:</p>
                ${ammoTypes.length > 0 ? 
                    ammoTypes.map(([type, amount]) => `<p class="text-white">${type}: ${amount}</p>`).join('') :
                    '<p class="text-gray-600">No ammo</p>'
                }
            </div>
        </div>
    `;
}