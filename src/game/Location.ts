import { NPC } from "../game/NPC";
import { Item } from "./Item";
import { Zombie } from './Zombie';

export class GameLocation {
    name: string;
    description: string;
    dangerLevel: number; // 1-10, affects zombie strength
    zombieTypes: string[]; // Types of zombies that can appear in this location
    items: Item[];
    npc: NPC | null;
    hasZombie: boolean;
    zombieChance: number;

    constructor(
        name: string, 
        description: string, 
        dangerLevel: number, 
        zombieTypes: string[], 
        items: Item[],
        npc: NPC | null = null,
        hasZombie: boolean = false,
        zombieChance: number = 0.2
    ) {
        this.name = name;
        this.description = description;
        this.dangerLevel = dangerLevel;
        this.zombieTypes = zombieTypes;
        this.items = items;
        this.npc = npc;
        this.hasZombie = hasZombie;
        this.zombieChance = zombieChance;
    }

    public getRandomZombie(): Zombie {
        const type = this.zombieTypes[Math.floor(Math.random() * this.zombieTypes.length)];
        const health = 30 + (this.dangerLevel * 10);
        const damage = 5 + (this.dangerLevel * 2);
        const experienceReward = 10 + (this.dangerLevel * 5);

        return new Zombie(type, health, damage, experienceReward);
    }

    // ... other methods ...
}