import { Player } from '../game/Player';
import { Zombie } from '../game/Zombie';
import { performFightAction } from '../game/Actions';
import { BodyPart } from '../game/health';

function createHealthIndicator(part: BodyPart): string {
    const circleClass = part.infected || part.bleeding ? 'text-gray-500' : 'text-gray-400';
    const infectedIcon = part.infected ? '<span class="text-green-500 ml-1">🦠</span>' : '';
    const bleedingIcon = part.bleeding ? '<span class="text-red-500 ml-1">🩸</span>' : '';
    
    return `
        <div class="flex items-center mb-1">
            <span class="w-20 text-gray-300">${part.name}:</span>
            <span class="${circleClass} mr-2">⚪</span>
            ${infectedIcon}${bleedingIcon}
            <span class="text-gray-300 ml-2">${part.health}/${part.maxHealth}</span>
        </div>
    `;
}

function createHealthDisplay(entity: Player | Zombie): string {
    const healthSystem = entity.healthSystem;
    const overallHealth = healthSystem.getOverallHealth();

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
        <div class="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 class="text-xl font-bold mb-2 text-gray-300">Overall Health: ${overallHealth}/100</h3>
            ${healthIndicators}
        </div>
    `;
}

export function renderFightUI(player: Player, zombie: Zombie): void {
    const fightContainer = document.createElement('div');
    fightContainer.id = 'fight-container';
    fightContainer.innerHTML = `
        <div id="player-stats">
            <h3 class="text-2xl font-bold mb-2">Player</h3>
            ${createHealthDisplay(player)}
        </div>
        <div id="zombie-stats">
            <h3 class="text-2xl font-bold mb-2">${zombie.type} Zombie</h3>
            ${createHealthDisplay(zombie)}
        </div>
        <div id="fight-actions" class="mt-4">
            <button id="attack-btn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Attack</button>
            <button id="defend-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Defend</button>
            <button id="flee-btn" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Flee</button>
            <button id="use-item-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Use Item</button>
        </div>
    `;
    
    document.body.appendChild(fightContainer);
    
    // Add event listeners
    document.getElementById('attack-btn')?.addEventListener('click', () => performFightAction(window.game, 'attack'));
    document.getElementById('defend-btn')?.addEventListener('click', () => performFightAction(window.game, 'defend'));
    document.getElementById('flee-btn')?.addEventListener('click', () => performFightAction(window.game, 'flee'));
    document.getElementById('use-item-btn')?.addEventListener('click', () => performFightAction(window.game, 'use-item'));
}

export function updateFightUI(player: Player, zombie: Zombie): void {
    const playerStatsEl = document.getElementById('player-stats');
    const zombieStatsEl = document.getElementById('zombie-stats');
    
    if (playerStatsEl) {
        playerStatsEl.innerHTML = `
            <h3 class="text-2xl font-bold mb-2">Player</h3>
            ${createHealthDisplay(player)}
        `;
    }
    
    if (zombieStatsEl) {
        zombieStatsEl.innerHTML = `
            <h3 class="text-2xl font-bold mb-2">${zombie.type} Zombie</h3>
            ${createHealthDisplay(zombie)}
        `;
    }
}