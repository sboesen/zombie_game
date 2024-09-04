import { Tool } from '../game/Tool';

export const tools: Tool[] = [
    {
        name: "Flashlight",
        type: "tool",
        durability: 100,
        description: "Improves search success rate by 25% in dark areas. Requires batteries. Battery life: 100/100 (each use depletes 1 unit).",
        quantity: 1,
        effect: 25
    },
    {
        name: "Binoculars",
        type: "tool",
        durability: Infinity,
        description: "Allows scouting of adjacent areas without moving. Reveals zombie numbers and possible loot. No durability loss.",
        quantity: 1,
        effect: 0
    },
    {
        name: "Lockpick Set",
        type: "tool",
        durability: 20,
        description: "Allows attempting to open locked doors or containers. Success rate based on player's skill. Each use has a 5% chance to break a pick.",
        quantity: 1,
        effect: 50
    },
    {
        name: "Crowbar",
        type: "tool",
        durability: 100,
        description: "Can open doors and containers silently. As a weapon, deals 15 damage with a 15% chance to stun.",
        quantity: 1,
        effect: 15
    },
    {
        name: "Firestarter",
        type: "tool",
        durability: 50,
        description: "Allows starting fires without matches or a lighter. 75% success rate, modified by weather conditions.",
        quantity: 1,
        effect: 75
    },
    {
        name: "Water Purifier",
        type: "tool",
        durability: 20,
        description: "Purifies contaminated water. Each use has a 90% chance to produce clean water.",
        quantity: 1,
        effect: 90
    },
    {
        name: "Makeshift Radio",
        type: "tool",
        durability: 50,
        description: "Allows receiving emergency broadcasts and contacting distant NPCs. Requires batteries.",
        quantity: 1,
        effect: 0
    }
];