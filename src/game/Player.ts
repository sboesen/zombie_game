import { HealthSystem } from './health';
import { Item } from '../game/Item';
import { Tool } from './Tool';
import { FirstAidKit } from './FirstAidKit';
import { addMessage } from '../utils/ui';

export class Player {
    health: HealthSystem;
    defending: boolean = false;
    hunger: number;
    inventory: Item[];
    equipment: {
        meleeWeapon: Item | null;
        rangedWeapon: Item | null;
        armor: Item | null;
        flashlight: Tool | null;
    };
    ammo: { [key: string]: number };
    public experience: number = 0;

    constructor() {
        this.health = new HealthSystem();
        this.hunger = 100;
        this.inventory = [];
        this.equipment = {
            meleeWeapon: null,
            rangedWeapon: null,
            armor: null,
            flashlight: null
        };
        this.ammo = {};
    }
}