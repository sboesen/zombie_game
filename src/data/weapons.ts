import { Weapon } from '../game/Weapon';

export const weapons: Weapon[] = [
    new Weapon(
        "Bare Hands",
        "Your trusty fists",
        "weapon",
        5, // damage
        "Low damage, but always available",
        1, // quantity
        "none", // ammoType
        Infinity, // durability
        95, // accuracy
        5 // damage
    ),
    new Weapon(
        "Rusty Knife",
        "A worn, slightly corroded blade with a wooden handle",
        "weapon",
        10,
        "50% chance to cause bleeding on hit.",
        1,
        "none",
        50,
        90,
        10
    ),
    new Weapon(
        "Baseball Bat",
        "A sturdy wooden bat with tape on the handle",
        "weapon",
        15,
        "10% chance to stun the target",
        1,
        "none",
        75,
        85,
        15
    ),
    new Weapon(
        "9mm Pistol",
        "A reliable semi-automatic handgun",
        "weapon",
        25,
        "Effective at short to medium range",
        1,
        "9mm",
        100,
        80,
        25
    ),
    new Weapon(
        "Hunting Rifle",
        "A bolt-action rifle with a scope",
        "weapon",
        40,
        "High damage, effective at long range",
        1,
        "rifle",
        90,
        95,
        40
    )
];