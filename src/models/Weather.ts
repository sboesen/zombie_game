export type WeatherType = 'Clear' | 'Rainy' | 'Foggy' | 'Stormy';

export interface Weather {
    type: WeatherType;
    description: string;
    effect: string;
}

export const weatherTypes: Weather[] = [
    { type: 'Clear', description: 'The sky is clear, visibility is good.', effect: 'No special effects.' },
    { type: 'Rainy', description: 'It\'s raining, the ground is wet and slippery.', effect: 'Movement takes longer, chance of getting sick increases.' },
    { type: 'Foggy', description: 'A thick fog covers the area, reducing visibility.', effect: 'Harder to spot zombies, but also harder for them to spot you.' },
    { type: 'Stormy', description: 'A fierce storm rages, with strong winds and heavy rain.', effect: 'Movement is severely impeded, high chance of getting sick.' },
];