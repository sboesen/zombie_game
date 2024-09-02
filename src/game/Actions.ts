import { Game } from '../game/Game'; // Ensure this path is correct
import { addMessage, shakeButton } from '../utils/ui';
import { Item } from '../game/Item';
import { Tool } from '../game/Tool';
import { Player } from './Player';
import { Zombie } from './Zombie';
import { renderFightUI, updateFightUI } from '../utils/fightUI'; // New import

export function toggleFlashlight(game: Game, flashlight: Tool): void { // Ensure flashlight is of type Tool
    if (flashlight.durability && flashlight.durability > 0) {
        game.setFlashlightOn(!game.isFlashlightOn());
        flashlight.durability--;
        addMessage(`You turned the flashlight ${game.isFlashlightOn() ? 'on' : 'off'}.`);
    } else {
        addMessage("The flashlight's batteries are dead.");
    }
}

// When calling toggleFlashlight, ensure the item is a Tool
export function fight(game: Game): void {
    const player = game.getPlayer();
    const zombieType = getRandomZombieType();
    const zombieHealth = getZombieHealth(zombieType);
    const zombieDamage = getZombieDamage(zombieType);
    const zombie = new Zombie(zombieType, zombieHealth, zombieDamage);
    
    game.setCurrentZombie(zombie); // Add this method to the Game class
    renderFightUI(player, zombie);
    
    const fightLoop = () => {
        // Update this line to call getCurrentHealth()
        if (player.health.getCurrentHealth() <= 0) {
            addMessage("You have been defeated. Game over.");
            game.gameOver();
            return;
        }
        
        if (zombie.health <= 0) {
            addMessage(`You have defeated the ${zombieType} zombie!`);
            game.resumeNormalGameplay();
            return;
        }
        
        updateFightUI(player, zombie);
    };
    
    game.setFightMode(true, fightLoop);
}

export function performFightAction(game: Game, action: string): void {
    const player = game.getPlayer();
    const zombie = game.getCurrentZombie();
    
    switch (action) {
        case 'attack':
            const damage = getPlayerDamage(game);
            zombie.health -= damage;
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
    if (zombie.health > 0) {
        let zombieDamage = getZombieDamage(zombie.type);
        if (player.defending) {
            zombieDamage = Math.floor(zombieDamage / 2);
            player.defending = false;
        }
        player.health.takeDamage(zombieDamage);
        addMessage(`The zombie dealt ${zombieDamage} damage to you.`);
    }
    
    game.continueFight();
}

function getRandomZombieType(): string {
    const zombieTypes = ['Crawler', 'Walker', 'Runner', 'Bloater'];
    return zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
}

function getZombieHealth(zombieType: string): number {
    switch (zombieType) {
        case 'Crawler': return 30;
        case 'Walker': return 50;
        case 'Runner': return 40;
        case 'Bloater': return 80;
        default: return 50;
    }
}

function getZombieDamage(zombieType: string): number {
    switch (zombieType) {
        case 'Crawler': return 5;
        case 'Walker': return 10;
        case 'Runner': return 15;
        case 'Bloater': return 20;
        default: return 10;
    }
}

function getPlayerDamage(game: Game): number {
    const meleeWeapon = game.getPlayer().equipment.meleeWeapon;
    const baseDamage = meleeWeapon ? meleeWeapon.effect || 5 : 5; // Check for null
    return baseDamage + Math.floor(Math.random() * 5); // Add some randomness to player damage
}