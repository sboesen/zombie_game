import { Item } from '../game/Item';

export interface Weapon extends Item {
    ammoType: string;
    durability: number;
}