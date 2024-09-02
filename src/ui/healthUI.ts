import { Player } from '../game/Player';

export function updateHealthUI(player: Player): string { // Change return type to string
    const health = player.health.getOverallHealth(); // Get the overall health
    return `Health: ${health}`; // Return the health string
}