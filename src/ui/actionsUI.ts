import { Game } from '../game/Game';

export function updateActionsUI(game: Game): string {
    return `
        <h3 class="text-lg font-bold mb-2 text-orange-300">Actions</h3>
        <button class="game-button shimmer bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.search()">Search</button>
        <button class="game-button shimmer bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.move()">Move</button>
        <button class="game-button shimmer bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.talkToNPC()">Talk to NPC</button>
        <button class="game-button shimmer bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.completeQuest()">Complete Quest</button>
        <button class="game-button shimmer bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.openCraftingMenu()">Open Crafting Menu</button>
        ${game.getCurrentLocation().hasZombie ? 
            `<button class="game-button shimmer bg-red-900 hover:bg-red-800 text-gray-200 font-bold py-2 px-4 rounded mb-4 w-full" onclick="window.game.fight()">Fight Zombie</button>` : 
            ''
        }
    `;
}