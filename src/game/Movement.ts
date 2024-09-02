import { Game } from '../game';
import { addMessage, updateUI } from '../utils/ui';

export function move(game: Game): void {
    const newLocationIndex = (game.getLocations().indexOf(game.getCurrentLocation()) + 1) % game.getLocations().length;
    const newLocation = game.getLocations()[newLocationIndex];
    game.changeLocation(newLocationIndex);
    addMessage(`You moved to ${newLocation.name}.`);
    game.getPlayer().hunger = Math.max(0, game.getPlayer().hunger - 10); // Decrease hunger by 10
    if (game.getPlayer().hunger === 0) {
        game.getPlayer().health.head -= 10;
        addMessage("You're starving! You lost 10 health.");
    }
    updateUI(game);

    let moveTime = 2;
    if (game.getCurrentWeather().type === 'Rainy') moveTime = 3;
    if (game.getCurrentWeather().type === 'Stormy') moveTime = 4;
    game.advanceTime(moveTime);

    if (['Rainy', 'Stormy'].includes(game.getCurrentWeather().type) && Math.random() < 0.2) {
        game.getPlayer().health.head -= 5;
        addMessage("You've caught a cold from the bad weather. [-5 Health]");
    }
}