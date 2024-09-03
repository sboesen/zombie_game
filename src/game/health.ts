import { addMessage } from '../utils/ui';

export interface BodyPart {
    name: string;
    health: number;
    maxHealth: number;
    infected: boolean;
    bleeding: boolean;
}

export class HealthSystem {
    head: number;
    torso: number;
    leftArm: number;
    rightArm: number;
    leftLeg: number;
    rightLeg: number;
    bleeding: { [key: string]: boolean };
    infected: { [key: string]: boolean };

    constructor() {
        this.head = 100;
        this.torso = 100;
        this.leftArm = 100;
        this.rightArm = 100;
        this.leftLeg = 100;
        this.rightLeg = 100;
        this.bleeding = {
            head: false,
            torso: false,
            leftArm: false,
            rightArm: false,
            leftLeg: false,
            rightLeg: false
        };
        this.infected = {
            head: false,
            torso: false,
            leftArm: false,
            rightArm: false,
            leftLeg: false,
            rightLeg: false
        };
    }

    getOverallHealth(): number {
        return Math.floor((this.head + this.torso + this.leftArm + this.rightArm + this.leftLeg + this.rightLeg) / 6);
    }

    // Add methods to handle bleeding and infection
    toggleBleeding(part: string, state: boolean) {
        if (part in this.bleeding) {
            this.bleeding[part] = state;
        }
    }

    toggleInfection(part: string, state: boolean) {
        if (part in this.infected) {
            this.infected[part] = state;
        }
    }

    getBodyPart(part: string): BodyPart {
        const health = this[part as keyof HealthSystem] as number;
        return {
            name: part,
            health: health,
            maxHealth: 100,
            infected: this.infected[part],
            bleeding: this.bleeding[part]
        };
    }

    heal(amount: number): number {
        const oldHealth = this.getOverallHealth();
        this.head = Math.min(100, this.head + amount);
        this.torso = Math.min(100, this.torso + amount);
        this.leftArm = Math.min(100, this.leftArm + amount);
        this.rightArm = Math.min(100, this.rightArm + amount);
        this.leftLeg = Math.min(100, this.leftLeg + amount);
        this.rightLeg = Math.min(100, this.rightLeg + amount);
        const newHealth = this.getOverallHealth();
        return newHealth - oldHealth;
    }

    takeDamage(amount: number): void {
        const damagePerPart = Math.floor(amount / 6);
        this.head = Math.max(0, this.head - damagePerPart);
        this.torso = Math.max(0, this.torso - damagePerPart);
        this.leftArm = Math.max(0, this.leftArm - damagePerPart);
        this.rightArm = Math.max(0, this.rightArm - damagePerPart);
        this.leftLeg = Math.max(0, this.leftLeg - damagePerPart);
        this.rightLeg = Math.max(0, this.rightLeg - damagePerPart);
    }

    healBodyPart(part: string, amount: number): void {
        if (part in this && typeof this[part as keyof HealthSystem] === 'number') {
            const currentHealth = this[part as keyof HealthSystem] as number;
            this[part as keyof HealthSystem] = Math.min(100, currentHealth + amount) as any;
        }
    }

    cureInfection(part: string): void {
        if (part in this.infected) {
            this.infected[part] = false;
        }
    }

    stopBleeding(part: string): void {
        if (part in this.bleeding) {
            this.bleeding[part] = false;
        }
    }

    getCurrentHealth(): number {
        return this.getOverallHealth();
    }
}