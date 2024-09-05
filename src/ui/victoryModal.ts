import { Player } from '../game/Player';
import { Zombie } from '../game/Zombie';
import { Item } from '../game/Item';

export function showVictoryModal(player: Player, zombie: Zombie, loot: Item[], xpGained: number): void {
    console.log('showVictoryModal called with loot:', loot);
    const modal = document.createElement('div');
    modal.id = 'victory-modal';
    modal.className = 'fixed inset-0 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 p-8 rounded-lg max-w-md w-full relative overflow-hidden z-10">
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

    createConfetti();

    // Close modal when clicking the button or pressing Escape
    const closeModal = () => {
        modal.remove();
    };

    document.getElementById('close-victory-modal')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function createConfetti(): void {
    const confettiCount = 200; // Reduced back to 200
    const container = document.getElementById('victory-modal');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.width = `${Math.random() * 10 + 5}px`; // Random width between 5-15px
        confetti.style.height = `${Math.random() * 10 + 5}px`; // Random height between 5-15px
        confetti.style.opacity = `${Math.random() * 0.5 + 0.5}`; // Random opacity between 0.5-1
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite, sway ${Math.random() * 4 + 2}s ease-in-out infinite alternate`;
        container?.appendChild(confetti);
    }
}

function getRandomColor(): string {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#ffc0cb'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add this CSS to your stylesheet
const confettiStyles = `
.confetti {
    position: absolute;
    top: -10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
}

@keyframes fall {
    to {
        transform: translateY(100vh);
    }
}

@keyframes sway {
    from {
        transform: translateX(-5px);
    }
    to {
        transform: translateX(5px);
    }
}
`;

// Inject the styles into the document
const styleElement = document.createElement('style');
styleElement.textContent = confettiStyles;
document.head.appendChild(styleElement);