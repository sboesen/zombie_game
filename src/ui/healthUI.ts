import { Player } from '../game/Player';

export function updateHealthUI(player: Player): string {
    const health = player.health;
    const overallHealth = health.getOverallHealth();

    const createHealthBar = (part: string, value: number) => {
        const bleeding = health.bleeding[part] ? '<span class="text-red-500 ml-1">🩸</span>' : '';
        const infected = health.infected[part] ? '<span class="text-green-500 ml-1">🦠</span>' : '';
        return `
            <div class="flex items-center mb-1">
                <span class="w-20 text-gray-300">${part}:</span>
                <div class="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                    <div class="bg-red-600 h-2.5 rounded-full" style="width: ${value}%"></div>
                </div>
                <span class="text-gray-300 w-8">${value}</span>
                ${bleeding}${infected}
            </div>
        `;
    };

    return `
        <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-bold mb-2 text-gray-300">Health: ${overallHealth}</h3>
            ${createHealthBar('Head', health.head)}
            ${createHealthBar('Torso', health.torso)}
            ${createHealthBar('Left Arm', health.leftArm)}
            ${createHealthBar('Right Arm', health.rightArm)}
            ${createHealthBar('Left Leg', health.leftLeg)}
            ${createHealthBar('Right Leg', health.rightLeg)}
        </div>
    `;
}