import { Game } from '../game';

export function updateHealthUI(game: Game): string {
    const health = game.getPlayer().health;

    function getStatusIcons(part: string): string {
        const bodyPart = health.bodyParts[part];
        let icons = '';
        
        if (bodyPart.bleeding) {
            icons += '<span class="text-red-500" title="Bleeding">🩸</span>';
        }
        if (bodyPart.infected) {
            icons += '<span class="text-green-500" title="Infected">🦠</span>';
        }
        if (!bodyPart.bleeding && !bodyPart.infected) {
            icons += '<span class="text-gray-500" title="Healthy">⚪</span>';
        }
        
        return icons;
    }

    return `
        <h3 class="text-sm font-bold mb-1 text-pink-300">Health Status</h3>
        <div class="grid grid-cols-3 gap-1 text-xs">
            ${Object.entries(health.bodyParts).map(([part, data]) => `
                <span class="text-gray-300">${data.name}: <span class="text-red-500">${data.health}</span>${getStatusIcons(part)}</span>
            `).join('')}
        </div>
        <div class="mt-1 text-xs">
            <span class="text-gray-300">Overall: <span class="text-red-500">${health.getOverallHealth()}</span>/100</span>
        </div>
    `;
}