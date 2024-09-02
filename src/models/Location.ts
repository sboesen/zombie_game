import { Item } from './Item';

export interface NPC {
    name: string;
    dialogue: string;
    quest?: {
        description: string;
        requiredItem: string;
        reward: Item;
    };
    questCompleted?: boolean;
}

export interface GameLocation {
    name: string;
    description: string;
    items: Item[];
    hasZombie: boolean;
    npc?: NPC;
}