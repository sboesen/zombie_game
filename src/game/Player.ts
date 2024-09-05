import { HealthSystem } from './health';
import { Item } from '../game/Item';
import { Tool } from './Tool';
import { FirstAidKit } from './FirstAidKit';
import { addMessage } from '../utils/ui';
import { Zombie } from './Zombie';

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

    attack(zombie: Zombie): { hit: boolean, damage: number } {
        const hitChance = 0.8; // 80% base hit chance
        const hit = Math.random() < hitChance;

        if (!hit) {
            return { hit: false, damage: 0 };
        }

        let baseDamage = 5; // Base unarmed damage
        if (this.equipment.meleeWeapon) {
            baseDamage = this.equipment.meleeWeapon.effect || 5;
        }

        // Factor in player's strength or other relevant stats
        const damageMultiplier = 1 + (this.level - 1) * 0.1; // 10% increase per level
        const damage = Math.floor(baseDamage * damageMultiplier);

        // Apply damage to a random body part
        const bodyParts = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        const targetPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
        zombie.healthSystem.takeDamageToBodyPart(targetPart, damage);

        return { hit: true, damage };
    }
}