import { Tool } from '../../game/Tool';
import { Game } from '../Game';
import { addMessage } from '../../utils/ui';

export class Flashlight implements Tool {
    durability: number;
    name: string;
    description: string;
    type: string;
    effect: number;
    quantity: number;
    textEffect: string;

    constructor() {
        this.durability = 100;
        this.name = "Flashlight";
        this.description = "A handheld light source";
        this.type = "tool";
        this.effect = 100;
        this.quantity = 1;
        this.textEffect = "Improves search success rate in dark areas";
    }

    canUse(game: Game): boolean {
        return this.durability > 0;
    }

    use(game: Game): void {
        if (this.canUse(game)) {
            game.setFlashlightOn(!game.isFlashlightOn());
            this.durability--;
            addMessage(`You turned the flashlight ${game.isFlashlightOn() ? 'on' : 'off'}.`);
        } else {
            addMessage("The flashlight's batteries are dead.");
        }
    }
}

export const flashlight = new Flashlight();