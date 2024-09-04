import { Player } from '../game/Player';
import { Zombie } from '../game/Zombie';
import { Item } from '../game/Item';

export function showVictoryModal(player: Player, zombie: Zombie, loot: Item[], xpGained: number): void {
    const modal = document.createElement('div');
    modal.id = 'victory-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 p-8 rounded-lg max-w-md w-full relative overflow-hidden">
            <h2 class="text-3xl font-bold mb-4 text-center text-yellow-400">Victory! 🎉</h2>
            <p class="text-xl mb-4 text-center text-white">You defeated the ${zombie.type.name} Zombie!</p>
            <div class="mb-4">
                <h3 class="text-lg font-bold mb-2 text-green-400">Loot:</h3>
                <ul class="list-disc list-inside text-white">
                    ${loot.map(item => `<li>${item.name}</li>`).join('')}
                </ul>
            </div>
            <p class="text-lg text-center text-blue-400">XP Gained: ${xpGained}</p>
            <button id="close-victory-modal" class="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
                Continue
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add confetti effect
    createConfetti();

    // Close modal when clicking the button
    document.getElementById('close-victory-modal')?.addEventListener('click', () => {
        modal.remove();
    });
}

function createConfetti(): void {
    const confettiCount = 200;
    const container = document.getElementById('victory-modal');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = getRandomColor();
        container?.appendChild(confetti);
    }
}

function getRandomColor(): string {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}