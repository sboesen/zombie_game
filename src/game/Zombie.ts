import { HealthSystem } from './health';
import { Item } from './Item';
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
        return this.healthSystem.isZombieAlive();
    }

    generateLoot(): Item[] {
        let generatedLoot: Item[] = [];
        for (let lootName in this.type.drops) {
            const item = Item.findItemByName(lootName);
            if (item) {
                generatedLoot.push(item);
            }
        }
        return generatedLoot;
    }
}