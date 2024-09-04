import { addMessage } from '../utils/ui';
import { ZombieHealth } from './ZombieType';

export interface BodyPart {
    name: string;
    health: number;
    maxHealth: number;
    infected: boolean;
    bleeding: boolean;
}

export class HealthSystem {
    head!: number;
    torso!: number;
    leftArm!: number;
    rightArm!: number;
    leftLeg!: number;
    rightLeg!: number;
    bleeding: { [key: string]: boolean };
    infected: { [key: string]: boolean };
    maxHealth: { [key: string]: number };

    constructor(zombieHealth?: ZombieHealth) {
        this.maxHealth = {
            head: 100,
            torso: 100,
            leftArm: 100,
            rightArm: 100,
            leftLeg: 100,
            rightLeg: 100
        };

        if (zombieHealth) {
            this.initializeZombieHealth(zombieHealth);
        } else {
            this.initializeDefaultHealth();
        }

        this.bleeding = {
            head: false,
            torso: false,
            leftArm: false,
            rightArm: false,
            leftLeg: false,
            rightLeg: false
        };
        this.infected = { ...this.bleeding };
    }

    private initializeZombieHealth(zombieHealth: ZombieHealth): void {
        for (const [part, health] of Object.entries(zombieHealth)) {
            const randomHealth = Math.floor(Math.random() * (health.max - health.min + 1)) + health.min;
            this[part as keyof HealthSystem] = randomHealth;
            this.maxHealth[part] = randomHealth;
        }
    }

    private initializeDefaultHealth(): void {
        for (const part of Object.keys(this.maxHealth)) {
            (this as any)[part] = this.maxHealth[part];
        }
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
            maxHealth: this.maxHealth[part],
            infected: this.infected[part],
            bleeding: this.bleeding[part]
        };
    }

    heal(amount: number): number {
        const oldHealth = this.getOverallHealth();
        for (const part of Object.keys(this.maxHealth)) {
            this[part as keyof HealthSystem] = Math.min(
                this.maxHealth[part],
                (this[part as keyof HealthSystem] as number) + amount
            ) as any;
        }
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

    isZombieAlive(): boolean {
        return this.head > 0;
    }

    isPlayerAlive(): boolean {
        return this.torso > 0 && this.head > 0;
    }
}