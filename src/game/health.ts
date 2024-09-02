export interface BodyPart {
    name: string;
    health: number;
    maxHealth: number;
    infected: boolean;
    bleeding: boolean;
}

export class HealthSystem {
    private currentHealth: number;
    private maxHealth: number;
    private bodyParts: BodyPart[];

    constructor(maxHealth: number = 100) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.bodyParts = [
            { name: 'Head', health: 100, maxHealth: 100, infected: false, bleeding: false },
            { name: 'Torso', health: 100, maxHealth: 100, infected: false, bleeding: false },
            { name: 'Left Arm', health: 100, maxHealth: 100, infected: false, bleeding: false },
            { name: 'Right Arm', health: 100, maxHealth: 100, infected: false, bleeding: false },
            { name: 'Left Leg', health: 100, maxHealth: 100, infected: false, bleeding: false },
            { name: 'Right Leg', health: 100, maxHealth: 100, infected: false, bleeding: false },
        ];
    }

    // New method to get current health
    getCurrentHealth(): number {
        return this.currentHealth;
    }

    getOverallHealth(): number {
        return this.currentHealth;
    }

    getBodyPart(name: string): BodyPart | undefined {
        return this.bodyParts.find(part => part.name === name);
    }

    stopBleedingAll(): void { // Implement stopBleeding method
        this.bodyParts.forEach(part => {
            part.bleeding = false; // Set bleeding to false for all body parts
        });
    }

    stopBleeding(bodyPart: string): void {
        const part = this.getBodyPart(bodyPart);
        if (part) {
            part.bleeding = false;
        }
    }

    takeDamage(amount: number): void {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
    }

    heal(amount: number): void {
        // Heal body parts, prioritizing head
        const head = this.getBodyPart('Head');
        if (head && head.health < head.maxHealth) {
            const healAmount = Math.min(amount, head.maxHealth - head.health);
            head.health += healAmount;
            amount -= healAmount;
        }

        // Heal other body parts
        this.bodyParts.forEach(part => {
            if (part.health < part.maxHealth) {
                const healAmount = Math.min(amount, part.maxHealth - part.health);
                part.health += healAmount;
                amount -= healAmount;
            }
        });
    }

    healBodyPart(bodyPart: string, amount: number): void {
        const part = this.getBodyPart(bodyPart);
        if (part) {
            part.health = Math.min(part.health + amount, 100);
        }
    }

    cureInfection(bodyPart: string): void {
        const part = this.getBodyPart(bodyPart);
        if (part) {
            part.infected = false;
        }
    }

    cureInfectionAll(): void {
        this.bodyParts.forEach(part => {
            part.infected = false;
        });
    }
}