import { Game } from '../game/Game';

export function updateStatusUI(game: Game): string {
    const totalHealth = game.getTotalHealth();
    return `
        <h3 class="text-lg font-bold mb-2 text-blue-300">Status</h3>
        <p class="mb-1">
            <span class="text-gray-400">Day:</span> 
            <span class="text-white">${game.getDay()}</span>
        </p>
        <p class="mb-1">
            <span class="text-gray-400">Time:</span> 
            <span class="text-white">${game.getTime().toString().padStart(2, '0')}:00</span>
        </p>
        ${game.getCurrentWeather() ? `
        <p class="mb-1">
            <span class="text-gray-400">Weather:</span> 
            <span class="text-white weather-status" data-weather='${JSON.stringify(game.getCurrentWeather())}'>${game.getCurrentWeather().type}</span>
        </p>
        ` : ''}
        <p class="mb-1">
            <span class="text-gray-400">Total Health:</span> 
            <span class="text-red-400 health-status" data-health="${totalHealth}">${totalHealth}</span><span class="text-gray-500">/600</span>
        </p>
        <p class="mb-1">
            <span class="text-gray-400">Hunger:</span> 
            <span class="text-yellow-400 hunger-status" data-hunger="${game.getPlayer().hunger}">${game.getPlayer().hunger}</span><span class="text-gray-500">/100</span>
        </p>
    `;
}