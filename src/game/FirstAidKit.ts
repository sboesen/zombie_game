import { Item } from './Item';
import { Player } from './Player';
import { addMessage } from '../utils/ui';

export function useFirstAidKit(player: Player, item: Item): void {
    if (item.durability && item.durability > 0) {
        const healAmount = item.effect || 0;
        let healed = false;

        for (const bodyPart in player.health) {
            if (player.health[bodyPart as keyof typeof player.health] < 100) {
                player.health[bodyPart as keyof typeof player.health] = Math.min(
                    100,
                    player.health[bodyPart as keyof typeof player.health] + healAmount
                );
                item.durability--;
                healed = true;
                addMessage(`You used the ${item.name} to heal your ${bodyPart}. [+${healAmount}]`);
                break;
            }
        }

        if (!healed) {
            addMessage("You're already at full health.");
        } else if (item.durability <= 0) {
            const index = player.inventory.indexOf(item);
            player.inventory.splice(index, 1);
            addMessage(`The ${item.name} has been used up and discarded.`);
        }
    } else {
        addMessage(`The ${item.name} is empty and cannot be used.`);
    }
}