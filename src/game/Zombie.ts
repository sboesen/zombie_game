export class Zombie {
    constructor(
        public type: string,
        public health: number,
        public baseDamage: number
    ) {}

    attack(): number {
        // Add some randomness to the zombie's attack
        return this.baseDamage + Math.floor(Math.random() * 3);
    }
}