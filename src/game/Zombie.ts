import { HealthSystem } from './health';
import { Item } from './Item';
import { ZombieType } from './ZombieType';
import { Player } from './Player';

export class Zombie {
    healthSystem: HealthSystem;
    type: ZombieType;

    constructor(type: ZombieType) {
        this.type = type;
        this.healthSystem = new HealthSystem(type.getHealth());
    }

    attack(player: Player): { hit: boolean, damage: number } {
        const hitChance = 0.7; // 70% base hit chance
        const hit = Math.random() < hitChance;

        if (!hit) {
            return { hit: false, damage: 0 };
        }

        const baseDamage = this.type.getDamage();
        const damage = Math.floor(baseDamage * (Math.random() * 0.4 + 0.8)); // 80% to 120% of base damage

        // Apply damage to a random body part
        const bodyParts = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        const targetPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
        player.healthSystem.takeDamageToBodyPart(targetPart, damage);

        return { hit: true, damage };
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