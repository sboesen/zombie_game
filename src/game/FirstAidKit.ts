import { Player } from './Player';
import { Item } from '../game/Item';
import { addMessage } from '../utils/ui';

export class FirstAidKit implements Item {
    name: string;
    type: string;
    uses: number;
    description: string;
    effect: number;
    quantity: number;

    constructor(uses: number = 3) {
        this.name = "First Aid Kit";
        this.type = "medical";
        this.uses = uses;
        this.description = "A kit to treat injuries and infections";
        this.effect = 20;
        this.quantity = 1;
    }

    use(player: Player) {
        const currentHealth = player.health.getCurrentHealth();
        if (currentHealth < 100) {
            const healAmount = Math.min(50, 100 - currentHealth);
            player.health.heal(healAmount);
            player.hunger = Math.max(0, player.hunger - 10);
            // Remove the thirst property as it doesn't exist on Player
            // ... any other effects
            return true;
        }
        return false;
    }

    useOn(player: Player, bodyPart: string): boolean {
        if (this.uses > 0) {
            const part = player.health.getBodyPart(bodyPart);
            if (part) {
                player.health.healBodyPart(bodyPart, 50);
                player.health.cureInfection(bodyPart);
                player.health.stopBleeding(bodyPart);
                this.uses--;
                addMessage(`Applied First Aid Kit to ${bodyPart}. [+50 Health]`);
                return true;
            }
        }
        return false;
    }
}