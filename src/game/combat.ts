export class Zombie {
    type: string;
    health: number;
    damage: number;

    constructor(type: string, health: number, damage: number) {
        this.type = type;
        this.health = health;
        this.damage = damage;
    }
}

export class CombatSystem {
    zombies: Zombie[];

    constructor() {
        this.zombies = [
            new Zombie('Walker', 50, 10),
            new Zombie('Runner', 30, 15),
            new Zombie('Brute', 100, 20),
        ];
    }

    encounter() {
        const zombie = this.zombies[Math.floor(Math.random() * this.zombies.length)];
        // Combat logic here
    }
}