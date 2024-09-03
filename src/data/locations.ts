import { GameLocation } from '../game/Location';
import { Item } from '../game/Item';

export const locations: GameLocation[] = [
    new GameLocation(
        "City Center",
        "A once-bustling urban area, now eerily quiet.",
        5,
        ["Walker", "Runner"],
        [
            new Item("Canned Food", "A can of non-perishable food.", "food", 20, 1),
            new Item("Bandage", "A sterile bandage for treating wounds.", "medical", 10, 2)
        ],
        null, // npc
        false, // hasZombie
        0.2 // zombieChance
    ),
    // ... other locations ...
];