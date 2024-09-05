import { Item } from "../game/Item";

// Items have a name, description, type, effect, textEffect, and quantity
export const items: Item[] = [
  {
    name: "Rusty Knife",
    description: "A worn, slightly corroded blade with a wooden handle",
    type: "weapon",
    effect: 10,
    textEffect: "50% chance to cause bleeding on hit.",
    quantity: 1,
  },
  {
    name: "Canned Beans",
    description: "A slightly dented tin can with a faded label",
    type: "food",
    effect: 15,
    textEffect: "Restores hunger when consumed",
    quantity: 3
  },
  {
    name: "First Aid Kit",
    description: "A white box with a red cross, slightly scuffed",
    type: "medical",
    effect: 50,
    textEffect: "Can treat one infection or injury.",
    quantity: 1
  },
  {
    name: "Flashlight",
    description: "A sturdy black cylinder with a slightly scratched lens",
    type: "tool",
    effect: 25,
    textEffect: "Improves search success rate in dark areas",
    quantity: 1,
  },
  {
    name: "Bottled Water",
    description: "A clear plastic bottle filled with clean water",
    type: "drink",
    effect: 20,
    textEffect: "Restores thirst when consumed",
    quantity: 5
  },
  {
    name: "Leather Jacket",
    description: "A worn but sturdy black leather jacket",
    type: "armor",
    effect: 10,
    textEffect: "Reduces damage taken",
    quantity: 1,
  },
  {
    name: "Shotgun",
    description: "A pump-action shotgun with a wood stock",
    type: "weapon",
    effect: 50,
    textEffect: "Deals 25 damage at medium range",
    quantity: 1,
  },
  {
    name: "Car Battery",
    description: "A heavy black box with two metal terminals",
    type: "crafting",
    effect: 0,
    textEffect: "Used for electrical recipes",
    quantity: 1
  },
  {
    name: "Energy Bar",
    description: 'A foil-wrapped bar with "ENERGY" printed on it',
    type: "food",
    effect: 10,
    textEffect: "Provides a temporary 10% speed boost for 5 turns",
    quantity: 2
  },
  {
    name: "Antibiotics",
    description: "A bottle of pills with a medical label",
    type: "medical",
    effect: 5,
    textEffect: "Cures infections over 5 turns",
    quantity: 1
  }
];