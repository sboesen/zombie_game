import { Item } from "../game/Item";

export const CannedBeans: Item = {
    name: "Canned Beans",
    description: "A slightly dented tin can with a faded label",
    type: "food",
    effect: 15,
    textEffect: "Restores hunger when consumed",
    quantity: 3
};

export const FirstAidKit: Item = {
    name: "First Aid Kit",
    description: "A white box with a red cross, slightly scuffed",
    type: "medical",
    effect: 50,
    textEffect: "Can treat one infection or injury.",
    quantity: 1
};

export const Flashlight: Item = {
    name: "Flashlight",
    description: "A sturdy black cylinder with a slightly scratched lens",
    type: "tool",
    effect: 25,
    textEffect: "Improves search success rate in dark areas",
    quantity: 1,
};

export const BottledWater: Item = {
    name: "Bottled Water",
    description: "A clear plastic bottle filled with clean water",
    type: "drink",
    effect: 20,
    textEffect: "Restores thirst when consumed",
    quantity: 5
};

export const LeatherJacket: Item = {
    name: "Leather Jacket",
    description: "A worn but sturdy black leather jacket",
    type: "armor",
    effect: 10,
    textEffect: "Reduces damage taken",
    quantity: 1,
};

export const CarBattery: Item = {
    name: "Car Battery",
    description: "A heavy black box with two metal terminals",
    type: "crafting",
    effect: 0,
    textEffect: "Used for electrical recipes",
    quantity: 1
};

export const EnergyBar: Item = {
    name: "Energy Bar",
    description: 'A foil-wrapped bar with "ENERGY" printed on it',
    type: "food",
    effect: 10,
    textEffect: "Provides a temporary 10% speed boost for 5 turns",
    quantity: 2
};

export const Antibiotics: Item = {
    name: "Antibiotics",
    description: "A bottle of pills with a medical label",
    type: "medical",
    effect: 5,
    textEffect: "Cures infections over 5 turns",
    quantity: 1
};

export const items: Item[] = [
    CannedBeans,
    FirstAidKit,
    Flashlight,
    BottledWater,
    LeatherJacket,
    CarBattery,
    EnergyBar,
    Antibiotics
];