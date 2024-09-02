export class Journal {
    entries: string[];

    constructor() {
        this.entries = [];
    }

    addEntry(entry: string) {
        this.entries.push(entry);
    }

    getEntries() {
        return this.entries;
    }

    // ... other journal methods
}