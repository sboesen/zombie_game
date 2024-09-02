import { Game } from '../game';

export function updateHealthUI(game: Game): string {
    const player = game.getPlayer();
    return `
        <h3 class="text-lg font-bold mb-2 text-pink-300">Health Status</h3>
        <div class="grid grid-cols-2 gap-2">
            <span class="text-gray-300">Head: <span class="text-red-500">${player.health.head}</span>/100</span>
            <span class="text-gray-300">Torso: <span class="text-red-500">${player.health.torso}</span>/100</span>
            <span class="text-gray-300">Left Arm: <span class="text-red-500">${player.health.leftArm}</span>/100</span>
            <span class="text-gray-300">Right Arm: <span class="text-red-500">${player.health.rightArm}</span>/100</span>
            <span class="text-gray-300">Left Leg: <span class="text-red-500">${player.health.leftLeg}</span>/100</span>
            <span class="text-gray-300">Right Leg: <span class="text-red-500">${player.health.rightLeg}</span>/100</span>
        </div>
    `;
}