import { NPC } from "../models/Location";
import { Item } from "./Item";

export interface GameLocation {
    name: string;
    description: string;
    items: Item[];
    hasZombie: boolean;
    npc?: NPC | null;
}