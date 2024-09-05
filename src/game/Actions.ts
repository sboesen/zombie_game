import { Game } from '../game/Game'; // Ensure this path is correct
import { addMessage, shakeButton } from '../utils/ui';
import { Item } from '../game/Item';
import { Tool } from '../game/Tool';
import { Player } from './Player';
import { Zombie } from './Zombie';
import { renderFightUI, updateFightUI } from '../ui/fightUI'; // New import

export function toggleFlashlight(game: Game, flashlight: Tool): void { // Ensure flashlight is of type Tool
    if (flashlight.durability && flashlight.durability > 0) {
        game.setFlashlightOn(!game.isFlashlightOn());
        flashlight.durability--;
        addMessage(`You turned the flashlight ${game.isFlashlightOn() ? 'on' : 'off'}.`);
    } else {
        addMessage("The flashlight's batteries are dead.");
    }
}

export function performFightAction(game: Game, action: string): void {
    const player = game.getPlayer();
    const zombie = game.getCurrentZombie();
    
    switch (action) {
        case 'attack':
            const playerAttackResult = player.attack(zombie);
            if (playerAttackResult.hit) {
                addMessage(`You hit the zombie for ${playerAttackResult.damage} damage.`);
            } else {
                addMessage("You missed!");
            }
            break;
        case 'defend':
            player.defending = true;
            addMessage("You brace yourself for the zombie's attack.");
            break;
        case 'flee':
            if (Math.random() < 0.5) {
                addMessage("You successfully fled from the fight!");
                game.resumeNormalGameplay();
                return;
            } else {
                addMessage("You failed to flee!");
            }
            break;
        case 'use-item':
            // Implement item usage logic here
            break;
    }
    
    // Zombie's turn
    if (zombie.healthSystem.isZombieAlive()) {
        const zombieAttackResult = zombie.attack(player);
        if (zombieAttackResult.hit) {
            let finalDamage = zombieAttackResult.damage;
            if (player.defending) {
                finalDamage = Math.floor(finalDamage / 2);
                player.defending = false;
            }
            addMessage(`The zombie hit you for ${finalDamage} damage.`);
        } else {
            addMessage("The zombie missed!");
        }
    }
    
    game.continueFight();
}

// Remove the getPlayerDamage function as it's no longer needed