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
            const damage = getPlayerDamage(game);
            zombie.healthSystem.takeDamage(damage);
            addMessage(`You dealt ${damage} damage to the zombie.`);
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
    if (zombie.healthSystem.getCurrentHealth() > 0) {
        let zombieDamage = zombie.type.getDamage();
        if (player.defending) {
            zombieDamage = Math.floor(zombieDamage / 2);
            player.defending = false;
        }
        player.healthSystem.takeDamage(zombieDamage);
        addMessage(`The zombie dealt ${zombieDamage} damage to you.`);
    }
    
    game.continueFight();
}

function getPlayerDamage(game: Game): number {
    const meleeWeapon = game.getPlayer().equipment.meleeWeapon;
    const baseDamage = meleeWeapon ? meleeWeapon.effect || 5 : 5; // Check for null
    return baseDamage + Math.floor(Math.random() * 5); // Add some randomness to player damage
}