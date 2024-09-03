import { GameLocation } from './Location';

export class Map {
    private locations: GameLocation[];

    constructor(locations: GameLocation[]) {
        this.locations = locations;
    }

    getRandomLocation(currentLocation: GameLocation): GameLocation {
        console.log('getRandomLocation started');
        if (this.locations.length <= 1) {
            console.log('Only one location available');
            return this.locations[0];
        }
        
        const availableLocations = this.locations.filter(location => location !== currentLocation);
        if (availableLocations.length === 0) {
            console.log('No other locations available');
            return currentLocation;
        }
        
        const newLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];
        console.log('getRandomLocation completed, new location:', newLocation.name);
        return newLocation;
    }
}