import { Player } from '../game/Player';
import { BodyPart } from '../game/health';

export function updateHealthUI(player: Player): string {
    const healthSystem = player.healthSystem;
    const overallHealth = healthSystem.getOverallHealth();

    const createHealthIndicator = (part: BodyPart) => {
        const circleClass = part.infected || part.bleeding ? 'text-gray-500' : 'text-gray-400';
        const infectedIcon = part.infected ? '<span class="text-green-500 ml-1">🦠</span>' : '';
        const bleedingIcon = part.bleeding ? '<span class="text-red-500 ml-1">🩸</span>' : '';
        
        return `
            <div class="flex items-center mb-2">
                <span class="w-24 text-gray-300">${part.name}:</span>
                <span class="${circleClass} mr-2">⚪</span>
                ${infectedIcon}${bleedingIcon}
                <span class="text-gray-300 ml-2">${part.health}/${part.maxHealth}</span>
            </div>
        `;
    };

    const bodyParts = [
        healthSystem.getBodyPart('head'),
        healthSystem.getBodyPart('torso'),
        healthSystem.getBodyPart('leftArm'),
        healthSystem.getBodyPart('rightArm'),
        healthSystem.getBodyPart('leftLeg'),
        healthSystem.getBodyPart('rightLeg')
    ];

    const healthIndicators = bodyParts.map(createHealthIndicator).join('');

    return `
        <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-bold mb-2 text-gray-300">Overall Health: ${overallHealth}/100</h3>
            ${healthIndicators}
        </div>
    `;
}