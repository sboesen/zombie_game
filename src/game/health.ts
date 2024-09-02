export interface BodyPart {
    name: string;
    health: number;
    maxHealth: number;
    infected: boolean;
    bleeding: boolean;
}

export class HealthSystem {
    bodyParts: { [key: string]: BodyPart };
    private overallHealth: number;

    constructor() {
        this.bodyParts = {
            head: { name: "Head", health: 100, maxHealth: 100, infected: false, bleeding: false },
            torso: { name: "Torso", health: 100, maxHealth: 100, infected: false, bleeding: false },
            leftArm: { name: "Left Arm", health: 100, maxHealth: 100, infected: false, bleeding: false },
            rightArm: { name: "Right Arm", health: 100, maxHealth: 100, infected: false, bleeding: false },
            leftLeg: { name: "Left Leg", health: 100, maxHealth: 100, infected: false, bleeding: false },
            rightLeg: { name: "Right Leg", health: 100, maxHealth: 100, infected: false, bleeding: false },
        };
        this.overallHealth = 100; // Initialize overallHealth
        this.updateOverallHealth();
    }

    takeDamage(part: string, amount: number) {
        if (this.bodyParts[part]) {
            this.bodyParts[part].health = Math.max(0, this.bodyParts[part].health - amount);
            if (Math.random() < 0.3) { // 30% chance to cause bleeding
                this.bodyParts[part].bleeding = true;
            }
            if (Math.random() < 0.1) { // 10% chance to cause infection
                this.bodyParts[part].infected = true;
            }
            this.updateOverallHealth();
        }
    }

    heal(part: string, amount: number) {
        if (this.bodyParts[part]) {
            this.bodyParts[part].health = Math.min(this.bodyParts[part].maxHealth, this.bodyParts[part].health + amount);
            this.updateOverallHealth();
        }
    }

    stopBleeding(part: string) {
        if (this.bodyParts[part]) {
            this.bodyParts[part].bleeding = false;
        }
    }

    cureInfection(part: string) {
        if (this.bodyParts[part]) {
            this.bodyParts[part].infected = false;
        }
    }

    applyStatusEffects() {
        for (const part in this.bodyParts) {
            if (this.bodyParts[part].bleeding) {
                this.bodyParts[part].health = Math.max(0, this.bodyParts[part].health - 1);
            }
            if (this.bodyParts[part].infected) {
                this.bodyParts[part].health = Math.max(0, this.bodyParts[part].health - 0.5);
            }
        }
        this.updateOverallHealth();
    }

    private updateOverallHealth() {
        const totalHealth = Object.values(this.bodyParts).reduce((sum, part) => sum + part.health, 0);
        const totalMaxHealth = Object.values(this.bodyParts).reduce((sum, part) => sum + part.maxHealth, 0);
        this.overallHealth = Math.round((totalHealth / totalMaxHealth) * 100);
    }

    getOverallHealth(): number {
        return this.overallHealth;
    }

    getBodyPart(part: string): BodyPart | undefined {
        return this.bodyParts[part];
    }
}