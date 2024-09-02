export class TimeSystem {
    hours: number;
    isDay: boolean;

    constructor() {
        this.hours = 6; // Start at 6 AM
        this.isDay = true;
    }

    advanceTime(hours: number) {
        this.hours += hours;
        if (this.hours >= 24) {
            this.hours -= 24;
        }
        this.isDay = this.hours >= 6 && this.hours < 18;
    }

    getTimeOfDay() {
        return this.isDay ? 'Day' : 'Night';
    }
}