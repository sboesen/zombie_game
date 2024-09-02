import { HealthSystem } from './health';
import { Item, Tool } from '../models/Item'; // Ensure Tool is imported

export class Player {
    health: HealthSystem;
    hunger: number;
    inventory: Item[];
    equipment: {
        meleeWeapon: Item | null;
        rangedWeapon: Item | null;
        armor: Item | null;
        flashlight: Tool | null; // Add flashlight property
    };
    ammo: { [key: string]: number };

    constructor() {
        this.health = new HealthSystem();
        this.hunger = 100;
        this.inventory = [];
        this.equipment = {
            meleeWeapon: null,
            rangedWeapon: null,
            armor: null,
            flashlight: null // Initialize flashlight
        };
        this.ammo = {};
    }

    // ... other methods ...
}