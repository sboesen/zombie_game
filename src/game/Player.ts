import { HealthSystem } from './health'; // Ensure this import is correct
import { Item } from '../game/Item'; // Ensure Tool is imported
import { Tool } from './Tool';

export class Player {
    health: HealthSystem; // Change this to HealthSystem
    defending: boolean = false;

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
        this.health = new HealthSystem(); // Initialize as an instance of HealthSystem
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