export class Zombie {
    constructor(
        public type: string,
        public health: number,
        public baseDamage: number,
        public experienceReward: number
    ) {
        this.experienceReward = Math.floor(Math.random() * 20) + 10; // Random experience between 10-30
    }

    attack(): number {
        // Add some randomness to the zombie's attack
        return this.baseDamage + Math.floor(Math.random() * 3);
    }
}