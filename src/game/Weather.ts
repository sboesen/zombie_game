export interface Weather {
    type: string;
    description: string;
    effect: string;
}

export const weatherTypes: Weather[] = [
    { type: 'Sunny', description: 'Clear skies', effect: 'No effect' },
    { type: 'Rainy', description: 'Rain showers', effect: 'Increased chance of catching a cold' },
    { type: 'Stormy', description: 'Thunderstorms', effect: 'High chance of catching a cold' },
    // Add more weather types as needed
];

export class WeatherSystem {
    currentWeather: string;

    constructor() {
        this.currentWeather = this.getRandomWeather();
    }

    getRandomWeather() {
        const weatherTypes = ['Sunny', 'Rainy', 'Foggy', 'Stormy'];
        return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    }

    changeWeather() {
        this.currentWeather = this.getRandomWeather();
    }

    // ... other weather methods
}