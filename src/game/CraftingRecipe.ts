import { CraftingComponent } from './CraftingComponent';
import { Item } from './Item';

export interface CraftingRecipe {
    name: string;
    components: CraftingComponent[];
    result: Item;
    ingredients: CraftingComponent[];
}