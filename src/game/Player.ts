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
}