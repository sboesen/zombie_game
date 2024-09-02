export class TimeSystem {
    currentTime: number; // 0 to 23 representing hours
    isDaytime: boolean;

    constructor() {
        this.currentTime = 6; // start at 6 AM
        this.isDaytime = true;
    }

    advanceTime(hours: number) {
        this.currentTime = (this.currentTime + hours) % 24;
        this.isDaytime = this.currentTime >= 6 && this.currentTime < 18;
    }

    // ... other methods for time management
}