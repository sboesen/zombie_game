import { Tool } from '../../game/Tool';
import { Game } from '../Game';
import { addMessage } from '../../utils/ui';

export class Flashlight implements Tool {
    constructor() {
        super(
            "Flashlight",
            "A handheld light source",
            "tool",
            100,
            1,
            "Improves search success rate in dark areas",
            5 // durability
        );
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