import { Player } from './Player';
import { BodyPart } from './health';
import { addMessage } from '../utils/ui';
import { Item } from '../game/Item'; // Adjusted import path

export class FirstAidKit implements Item { // Ensure it implements Item
    name: string;
    type: string;
    uses: number;

    constructor(uses: number = 3) {
        this.name = "First Aid Kit"; // Set name
        this.type = "medical"; // Set type
        this.uses = uses;
    }

    use(player: Player, bodyPart: string) {
        if (this.uses <= 0) {
            addMessage("The first aid kit is empty!");
            return;
        }

        const part = player.health.getBodyPart(bodyPart);
        if (!part) {
            addMessage(`Invalid body part: ${bodyPart}`);
            return;
        }

        const healAmount = 20;
        const originalHealth = part.health;
        player.health.healBodyPart(bodyPart, healAmount);
        const actualHealAmount = part.health - originalHealth;

        this.uses--;

        if (part.infected) {
            player.health.cureInfection(bodyPart);
            addMessage(`Cured infection on ${part.name}.`);
        }

        if (part.bleeding) {
            player.health.stopBleeding(bodyPart);
            addMessage(`Stopped bleeding on ${part.name}.`);
        }

        addMessage(`Used first aid kit on ${part.name}. Healed ${actualHealAmount} health. ${this.uses} uses left.`);
    }
}

// Update this method to ensure correct typing
export function useFirstAidKit(player: Player, bodyPart: string): boolean {
    const firstAidKit = player.inventory.find(item => item.name === "First Aid Kit");
    
    if (!firstAidKit || !isFirstAidKit(firstAidKit)) { // Use the type guard
        addMessage("You don't have a First Aid Kit.");
        return false; // Indicate failure
    }
    player.health.stopBleedingAll(); // Stop bleeding for all body parts


    firstAidKit.use(player, bodyPart); // Use the existing FirstAidKit instance
    return true; // Indicate success
}

function isFirstAidKit(item: Item): item is FirstAidKit {
    return (item as FirstAidKit).uses !== undefined; // Check for the 'uses' property
}