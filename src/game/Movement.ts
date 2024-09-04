import { Game } from '../game/Game';
import { addMessage, updateUI } from '../utils/ui';
import { Player } from './Player'; // Add this import
import { HealthSystem } from './health';

export function move(game: Game): void {
    const newLocationIndex = (game.getLocations().indexOf(game.getCurrentLocation()) + 1) % game.getLocations().length;
    const newLocation = game.getLocations()[newLocationIndex];
    game.changeLocation(newLocationIndex);
    addMessage(`You moved to ${newLocation.name}.`);
    game.getPlayer().hunger = Math.max(0, game.getPlayer().hunger - 10); // Decrease hunger by 10
    if (game.getPlayer().hunger === 0) {
        const headPart = game.getPlayer().healthSystem.getBodyPart('head');
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
        const headPart = game.getPlayer().healthSystem.getBodyPart('head');
        if (headPart) {
            headPart.health -= 5;
            addMessage("You've caught a cold from the bad weather. [-5 Health]");
        }
    }
}

export function rest(player: Player) {
    const headPart = player.healthSystem.getBodyPart('head');
    if (headPart && headPart.health > 0) {
        // ... existing rest logic ...
    } else {
        console.log("Cannot rest. Player is incapacitated.");
    }
}

function someFunction(player: Player) {
    const head = player.healthSystem.getBodyPart('head');
    if (head) {
        console.log(`Head health: ${head.health}`);
    } else {
        console.log('Head part not found');
    }
}

export class Movement {
    static getMovementSpeed(player: Player): number {
        const healthSystem = player.healthSystem;
        const leftLeg = healthSystem.getBodyPart('leftLeg');
        const rightLeg = healthSystem.getBodyPart('rightLeg');

        let speed = 100; // Base speed

        if (leftLeg.health < 50 || rightLeg.health < 50) {
            speed *= 0.5; // Halve speed if either leg is badly injured
        } else if (leftLeg.health < 75 || rightLeg.health < 75) {
            speed *= 0.75; // Reduce speed by 25% if either leg is moderately injured
        }

        if (leftLeg.bleeding || rightLeg.bleeding) {
            speed *= 0.8; // Further reduce speed by 20% if bleeding
        }

        return speed;
    }
}