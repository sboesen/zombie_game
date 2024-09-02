import { Game } from '../game';
import { addMessage, shakeButton } from '../utils/ui';
import { Item, Tool } from '../models/Item'; // Ensure Tool is imported
import { Player } from './Player';

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
    const flashlight = player.equipment.flashlight as Tool; // Cast to Tool if necessary

    if (flashlight) {
        toggleFlashlight(game, flashlight); // Now this should work
    }
}

function getRandomZombieType(): string {
    const zombieTypes = ['Crawler', 'Walker', 'Runner', 'Bloater'];
    return zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
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