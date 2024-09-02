export interface Location {
    name: string;
    description: string;
    items: string[];
}

export class LocationSystem {
    locations: Location[];

    constructor() {
        this.locations = [
            { name: 'Abandoned House', description: 'A rundown house with broken windows.', items: ['Rusty Knife', 'Canned Beans'] },
            { name: 'Police Station', description: 'A fortified building with a few zombies inside.', items: ['Shotgun', 'Kevlar Vest'] },
            // Add more locations here
        ];
    }

    getLocation(name: string) {
        return this.locations.find(loc => loc.name === name);
    }
}