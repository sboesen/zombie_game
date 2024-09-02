import { Item } from './Item';

export interface Player {
    health: {
        head: number;
        torso: number;
        leftArm: number;
        rightArm: number;
        leftLeg: number;
        rightLeg: number;
    };
    hunger: number;
    inventory: Item[];
    equipment: {
        meleeWeapon: Item | null;
        rangedWeapon: Item | null;
        armor: Item | null;
    };
    ammo: {
        [key: string]: number;
    };
}