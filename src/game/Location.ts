import { NPC } from "../game/NPC";
import { Item } from "./Item";
import { Zombie } from './Zombie';
import { ZombieType } from './ZombieType';
import { ZombieSpawnConfig } from './ZombieSpawnConfig';

export class GameLocation {
    name: string;
    description: string;
    dangerLevel: number;
    zombieSpawnConfigs: ZombieSpawnConfig[];
    currentZombies: Zombie[];
    currentItems: Item[];
    npc: NPC | null;
    private dayZombieChance: number;
    private nightZombieChance: number;

    constructor(
        name: string, 
        description: string, 
        dangerLevel: number, 
        zombieSpawnConfigs: ZombieSpawnConfig[], 
        items: Item[],
        dayZombieChance: number,
        nightZombieChance: number,
        npc: NPC | null = null
    ) {
        this.name = name;
        this.description = description;
        this.dangerLevel = dangerLevel;
        this.zombieSpawnConfigs = zombieSpawnConfigs;
        this.currentItems = [...items];
        this.currentZombies = [];
        this.dayZombieChance = dayZombieChance;
        this.nightZombieChance = nightZombieChance;
        this.npc = npc;
    }

    public hasZombies(): boolean {
        return this.currentZombies.length > 0;
    }

    public attemptZombieSpawn(isNight: boolean): void {
        const spawnChance = isNight ? this.nightZombieChance : this.dayZombieChance;
        if (Math.random() < spawnChance) {
            this.spawnRandomZombie();
        }
    }

    private spawnRandomZombie(): void {
        const config = this.zombieSpawnConfigs[Math.floor(Math.random() * this.zombieSpawnConfigs.length)];
        if (Math.random() < config.chance) {
            const count = Math.floor(Math.random() * 2) + 1; // Spawn 1 or 2 zombies
            for (let i = 0; i < count; i++) {
                this.currentZombies.push(new Zombie(config.type));
            }
        }
    }

    public spawnInitialZombies(): void {
        for (const config of this.zombieSpawnConfigs) {
            if (Math.random() < config.chance) {
                const count = Math.floor(Math.random() * (config.maxCount - config.minCount + 1)) + config.minCount;
                for (let i = 0; i < count; i++) {
                    this.currentZombies.push(new Zombie(config.type));
                }
            }
        }
    }

    public getZombies(): Zombie[] {
        return this.currentZombies;
    }

    public removeZombie(zombie: Zombie): void {
        const index = this.currentZombies.indexOf(zombie);
        if (index > -1) {
            this.currentZombies.splice(index, 1);
        }
    }

    public addItem(item: Item): void {
        this.currentItems.push(item);
    }

    public removeItem(item: Item): void {
        const index = this.currentItems.indexOf(item);
        if (index > -1) {
            this.currentItems.splice(index, 1);
        }
    }

    public getItems(): Item[] {
        return this.currentItems;
    }

    // ... other methods ...
}