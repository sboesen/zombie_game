import { Player } from '../game/Player';
import { Zombie } from '../game/Zombie';
import { performFightAction } from '../game/Actions'; // Add this import

export function renderFightUI(player: Player, zombie: Zombie): void {
    const fightContainer = document.createElement('div');
    fightContainer.id = 'fight-container';
    fightContainer.innerHTML = `
        <div id="player-stats">
            <h3>Player</h3>
            <p>Health: <span id="player-health">${player.health}</span></p>
        </div>
        <div id="zombie-stats">
            <h3>${zombie.type} Zombie</h3>
            <p>Health: <span id="zombie-health">${zombie.health}</span></p>
        </div>
        <div id="fight-actions">
            <button id="attack-btn">Attack</button>
            <button id="defend-btn">Defend</button>
            <button id="flee-btn">Flee</button>
            <button id="use-item-btn">Use Item</button>
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
    const playerHealthEl = document.getElementById('player-health');
    const zombieHealthEl = document.getElementById('zombie-health');
    
    if (playerHealthEl) playerHealthEl.textContent = player.health.toString();
    if (zombieHealthEl) zombieHealthEl.textContent = zombie.health.toString();
}