export interface BodyPart {
    name: string;
    health: number;
    maxHealth: number;
    infected: boolean;
}

export class HealthSystem {
    bodyParts: BodyPart[];

    constructor() {
        this.bodyParts = [
            { name: 'Head', health: 100, maxHealth: 100, infected: false },
            { name: 'Torso', health: 100, maxHealth: 100, infected: false },
            { name: 'Left Arm', health: 100, maxHealth: 100, infected: false },
            { name: 'Right Arm', health: 100, maxHealth: 100, infected: false },
            { name: 'Left Leg', health: 100, maxHealth: 100, infected: false },
            { name: 'Right Leg', health: 100, maxHealth: 100, infected: false },
        ];
    }

    takeDamage(partName: string, damage: number) {
        const part = this.bodyParts.find(p => p.name === partName);
        if (part) {
            part.health = Math.max(0, part.health - damage);
            if (part.health === 0) {
                part.infected = true; // Example infection logic
            }
        }
    }

    heal(partName: string, amount: number) {
        const part = this.bodyParts.find(p => p.name === partName);
        if (part) {
            part.health = Math.min(part.maxHealth, part.health + amount);
        }
    }
}