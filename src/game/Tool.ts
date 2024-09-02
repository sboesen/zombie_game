import { Item } from './Item';

export interface Tool extends Item {
    durability: number; // Specific to tools
}