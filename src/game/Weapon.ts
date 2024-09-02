import { Item } from './Item';

export interface Weapon extends Item {
    ammoType: string; // Specific to weapons
    durability: number; // Specific to weapons
}