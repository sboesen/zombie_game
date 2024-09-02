import { Item } from '../game/Item';

export interface Tool extends Item {
    durability: number;
}