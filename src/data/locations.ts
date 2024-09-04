import { GameLocation } from '../game/Location';
import { Item } from '../game/Item';
import { ZombieSpawnConfig } from '../game/ZombieSpawnConfig';
import { ZombieType } from '../game/ZombieType';

export const locations: GameLocation[] = [
    new GameLocation(
        "City Center",
        "A once-bustling urban area, now eerily quiet.",
        5,
        [{ type: ZombieType.WALKER, chance: 0.5, minCount: 1, maxCount: 3 }],
        [
            new Item("Canned Food", "A can of non-perishable food.", "food", 20, 1),
            new Item("Bandage", "A sterile bandage for treating wounds.", "medical", 10, 2)
        ],
        0.1, // dayZombieChance
        0.2, // nightZombieChance
        null // npc
    ),
    // ... other locations ...
];