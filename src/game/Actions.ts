import { Game } from '../game';
import { addMessage, shakeButton } from '../utils/ui';
import { Item } from './Item';

export function toggleFlashlight(game: Game, flashlight: Item): void {
    if (flashlight.durability && flashlight.durability > 0) {
        game.setFlashlightOn(!game.isFlashlightOn());
        flashlight.durability--;
        addMessage(`You turned the flashlight ${game.isFlashlightOn() ? 'on' : 'off'}.`);
    } else {
        addMessage("The flashlight's batteries are dead.");
    }
}

export function fight(game: Game): void {
    if (!game.getCurrentLocation().hasZombie) {
        addMessage("There's no zombie here to fight!");
        const fightButton = document.querySelector('button:contains("Fight Zombie")') as HTMLElement;
        if (fightButton) shakeButton(fightButton);
        return;
    }

    const zombieType = getRandomZombieType();
    const zombieDamage = getZombieDamage(zombieType);
    const playerDamage = getPlayerDamage(game);

    if (!game.getPlayer().equipment.meleeWeapon && !game.getPlayer().equipment.rangedWeapon) {
        game.getPlayer().health.head -= zombieDamage;
        addMessage(`You fought the ${zombieType} zombie with your bare hands! You lost ${zombieDamage} health.`);
    } else if (game.getPlayer().equipment.rangedWeapon) {
        const ammoType = game.getPlayer().equipment.rangedWeapon?.ammoType;
        if (ammoType && game.getPlayer().ammo?.[ammoType] != null && game.getPlayer().ammo[ammoType] > 0) {
            const playerAmmo = game.getPlayer().ammo[ammoType];
            if (playerAmmo != null && playerAmmo > 0) {
                game.getPlayer().ammo[ammoType]--;
                game.getPlayer().health.head -= Math.floor(zombieDamage / 2);
                addMessage(`You fought the ${zombieType} zombie with your ${game.getPlayer().equipment.rangedWeapon?.name || 'your ranged weapon'}! You lost ${Math.floor(zombieDamage / 2)} health.`);
            } else {
                addMessage("You're out of ammo! Switching to melee combat.");
                game.getPlayer().health.head -= zombieDamage;
                addMessage(`You fought the ${zombieType} zombie with your ${game.getPlayer().equipment.meleeWeapon?.name || 'bare hands'}! You lost ${zombieDamage} health.`);
            }
            // Ensure rangedWeapon is not null before accessing its name
            const rangedWeaponName = game.getPlayer().equipment.rangedWeapon?.name || 'your bare hands';
            addMessage(`You fought the ${zombieType} zombie with your ${rangedWeaponName}! You lost ${Math.floor(zombieDamage / 2)} health.`);
        } else {
            addMessage("You're out of ammo! Switching to melee combat.");
            game.getPlayer().health.head -= zombieDamage;
            addMessage(`You fought the ${zombieType} zombie with your ${game.getPlayer().equipment.meleeWeapon?.name || 'bare hands'}! You lost ${zombieDamage} health.`);
        }
    } else {
        game.getPlayer().health.head -= Math.floor(zombieDamage / 2);
        addMessage(`You fought the ${zombieType} zombie with your ${game.getPlayer().equipment.meleeWeapon?.name || 'bare hands'}! You lost ${Math.floor(zombieDamage / 2)} health.`);
    }

    addMessage(`You dealt ${playerDamage} damage to the zombie.`);

    game.getCurrentLocation().hasZombie = false;
    addMessage("You defeated the zombie!");

    if (game.getPlayer().health.head <= 0) {
        addMessage("Game Over! You died.");
        // Implement game over logic here
    }

    game.advanceTime(1); // Fighting takes 1 hour
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