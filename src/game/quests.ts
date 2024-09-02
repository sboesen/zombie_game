export class Quest {
    name: string;
    description: string;
    reward: string;
    completed: boolean;

    constructor(name: string, description: string, reward: string) {
        this.name = name;
        this.description = description;
        this.reward = reward;
        this.completed = false;
    }
}

export class QuestSystem {
    quests: { [key: string]: Quest };

    constructor() {
        this.quests = {
            // ... existing quests
            "Sample Collection": new Quest("Sample Collection", "Gather infected blood samples from 5 different zombie types.", "Advanced Medkit"),
            // ... add more quests
        };
    }

    completeQuest(questName: string) {
        const quest = Object.values(this.quests).find((q: Quest) => q.name === questName);
        if (quest) {
            quest.completed = true;
        }
    }
}