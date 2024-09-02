export class Location {
    name: string;
    description: string;
    items: string[];

    constructor(name: string, description: string, items: string[]) {
        this.name = name;
        this.description = description;
        this.items = items;
    }

    // ... other location methods
}

const locations = [
    new Location("Abandoned House", "A rundown house with broken windows.", ["Rusty Knife", "Canned Beans"]),
    new Location("Police Station", "A fortified building with a few zombies inside.", ["Shotgun", "Kevlar Vest"]),
    // ... add more locations
];