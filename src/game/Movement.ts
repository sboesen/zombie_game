import { Game } from '../game';
import { addMessage, updateUI } from '../utils/ui';
import { Player } from './Player'; // Add this import

export function move(game: Game): void {
    const newLocationIndex = (game.getLocations().indexOf(game.getCurrentLocation()) + 1) % game.getLocations().length;
    const newLocation = game.getLocations()[newLocationIndex];
    game.changeLocation(newLocationIndex);
    addMessage(`You moved to ${newLocation.name}.`);
    game.getPlayer().hunger = Math.max(0, game.getPlayer().hunger - 10); // Decrease hunger by 10
    if (game.getPlayer().hunger === 0) {
        const headPart = game.getPlayer().health.getBodyPart('head');
        if (headPart) {
            headPart.health -= 10;
            addMessage("You're starving! You lost 10 health.");
        }
    }
    updateUI(game);

    let moveTime = 2;
    if (game.getCurrentWeather().type === 'Rainy') moveTime = 3;
    if (game.getCurrentWeather().type === 'Stormy') moveTime = 4;
    game.advanceTime(moveTime);

    if (['Rainy', 'Stormy'].includes(game.getCurrentWeather().type) && Math.random() < 0.2) {
        const headPart = game.getPlayer().health.getBodyPart('head');
        if (headPart) {
            headPart.health -= 5;
            addMessage("You've caught a cold from the bad weather. [-5 Health]");
        }
    }
}

export function rest(player: Player) {
    const headPart = player.health.getBodyPart('head');
    if (headPart && headPart.health > 0) {
        // ... existing rest logic ...
    } else {
        console.log("Cannot rest. Player is incapacitated.");
    }
}