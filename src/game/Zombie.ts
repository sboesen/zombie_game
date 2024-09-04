import { HealthSystem } from './health';
import { ZombieType } from './ZombieType';

export class Zombie {
    healthSystem: HealthSystem;
    type: ZombieType;
    damage: number;

    constructor(type: ZombieType) {
        this.type = type;
        this.healthSystem = new HealthSystem(type.getHealth());
        this.damage = type.getDamage();
    }

    experienceReward(): number {
        return this.type.experienceReward;
    }

    isAlive(): boolean {
        return this.healthSystem.isAlive();
    }

    // ... (keep other methods unchanged)
}