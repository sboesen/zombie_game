import { Game } from './game/Game';
import { updateUI } from './utils/ui';
import { setupCraftingModal } from './ui/craftingUI';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    (window as any).game = game;  // Make game globally accessible

    // Setup the crafting modal
    setupCraftingModal(game);

    // Initial UI update
    updateUI(game);

    // Set up any other event listeners or game loop here
    // ...

    console.log('Game initialized');
});