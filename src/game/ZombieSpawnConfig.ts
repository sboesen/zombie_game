import { ZombieType } from './ZombieType';

export interface ZombieSpawnConfig {
    type: ZombieType;
    chance: number;
    minCount: number;
    maxCount: number;
}