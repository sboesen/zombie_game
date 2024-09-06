import { Weapon } from '../game/Weapon';

export const BareHands = new Weapon(
    "Bare Hands",
    "Your trusty fists",
    "weapon",
    5,
    "Low damage, but always available",
    1,
    "none",
    Infinity,
    95,
    5
);

export const RustyKnife = new Weapon(
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
);

export const BaseballBat = new Weapon(
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
);

export const PistolNineMillimeter = new Weapon(
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
);

export const HuntingRifle = new Weapon(
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
);

export const Shotgun = new Weapon(
    "Shotgun",
    "A pump-action shotgun with a wood stock",
    "weapon",
    50,
    "Deals 25 damage at medium range",
    1,
    "shotgun",
    100,
    75,
    25
);

export const weapons: Weapon[] = [
    BareHands,
    RustyKnife,
    BaseballBat,
    PistolNineMillimeter,
    HuntingRifle,
    Shotgun
];