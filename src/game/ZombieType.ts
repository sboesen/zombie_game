export interface LimbHealth {
    min: number;
    max: number;
}

export interface ZombieHealth {
    head: LimbHealth;
    torso: LimbHealth;
    leftArm: LimbHealth;
    rightArm: LimbHealth;
    leftLeg: LimbHealth;
    rightLeg: LimbHealth;
}

export class ZombieType {
    constructor(
        public readonly name: string,
        public readonly health: ZombieHealth,
        public readonly baseDamage: number,
        public readonly damageRange: number,
        public readonly experienceReward: number,
        public readonly drops: string[]
    ) {}

    getHealth(): ZombieHealth {
        return this.health;
    }

    getDamage(): number {
        return this.baseDamage + Math.floor(Math.random() * this.damageRange);
    }

    static readonly CRAWLER = new ZombieType(
        "Crawler",
        {
            head: { min: 5, max: 10 },
            torso: { min: 10, max: 15 },
            leftArm: { min: 5, max: 8 },
            rightArm: { min: 5, max: 8 },
            leftLeg: { min: 3, max: 5 },
            rightLeg: { min: 3, max: 5 },
        },
        2, 3, 5, ["Rotten Flesh"]
    );

    static readonly WALKER = new ZombieType(
        "Walker",
        {
            head: { min: 15, max: 25 },
            torso: { min: 20, max: 30 },
            leftArm: { min: 10, max: 15 },
            rightArm: { min: 10, max: 15 },
            leftLeg: { min: 10, max: 15 },
            rightLeg: { min: 10, max: 15 },
        },
        5, 5, 10, ["Rotten Flesh", "Tattered Clothes"]
    );

    static readonly BLOATER = new ZombieType(
        "Bloater",
        {
            head: { min: 30, max: 40 },
            torso: { min: 40, max: 60 },
            leftArm: { min: 20, max: 30 },
            rightArm: { min: 20, max: 30 },
            leftLeg: { min: 20, max: 30 },
            rightLeg: { min: 20, max: 30 },
        },
        8, 7, 20, ["Rotten Flesh", "Bile Sac"]
    );
}