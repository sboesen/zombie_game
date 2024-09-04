import { HealthSystem } from './health';
import { Item } from '../game/Item';
import { Tool } from './Tool';
import { FirstAidKit } from './FirstAidKit';
import { addMessage } from '../utils/ui';

export class Player { // Implementing the Player interface
    healthSystem: HealthSystem; // Use HealthSystem for health management
    defending: boolean = false;
    hunger: number;
    inventory: Item[];
    equipment: {
        meleeWeapon: Item | null;
        rangedWeapon: Item | null;
        armor: Item | null;
    };
    ammo: { [key: string]: number };
    public experience: number = 0;
    public xp: number = 0; // Added xp property
    public level: number = 1; // Added level property

    constructor() {
        this.healthSystem = new HealthSystem(); // Initialize HealthSystem
        this.hunger = 100;
        this.inventory = [];
        this.equipment = {
            meleeWeapon: null,
            rangedWeapon: null,
            armor: null
        };
        this.ammo = {};
    }

    // Example method to take damage
    takeDamage(amount: number): void {
        this.healthSystem.takeDamage(amount);
    }

    // Example method to heal
    heal(amount: number): number {
        return this.healthSystem.heal(amount);
    }

    // Example method to get overall health
    getOverallHealth(): number {
        return this.healthSystem.getOverallHealth();
    }

    isAlive(): boolean {
        return this.healthSystem.isPlayerAlive();
    }

    public addItems(items: Item[]): void {
        this.inventory.push(...items);
    }

    public addXP(xp: number): void {
        this.xp += xp;
        // You might want to add level-up logic here
        this.checkLevelUp();
    }

    private checkLevelUp(): void {
        // Implement level-up logic here
        // For example:
        const xpNeededForNextLevel = this.level * 100; // Simple formula, adjust as needed
        if (this.xp >= xpNeededForNextLevel) {
            this.level++;
            // You might want to increase player stats here
        }
    }
}