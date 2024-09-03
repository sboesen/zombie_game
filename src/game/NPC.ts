import { Quest } from './Quest';

export class NPC {
    name: string;
    dialogue: string;
    quest: Quest | null;
    questCompleted: boolean;

    constructor(name: string, dialogue: string, quest: Quest | null = null) {
        this.name = name;
        this.dialogue = dialogue;
        this.quest = quest;
        this.questCompleted = false;
    }

    // ... other methods ...
}