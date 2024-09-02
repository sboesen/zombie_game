export interface Quest {
    name: string;
    description: string;
    completed: boolean;
}

export class QuestSystem {
    quests: Quest[];

    constructor() {
        this.quests = [
            { name: 'Sample Collection', description: 'Gather infected blood samples from 5 different zombie types.', completed: false },
            { name: 'Vehicular Resurrection', description: 'Find specific car parts to repair an escape vehicle.', completed: false },
            // Add more quests here
        ];
    }

    completeQuest(questName: string) {
        const quest = this.quests.find(q => q.name === questName);
        if (quest) {
            quest.completed = true;
        }
    }
}