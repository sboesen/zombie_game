import { Item, Tool } from './models/Item'; // Ensure Tool is imported
import { GameLocation } from './game/Location';
import { Player } from './game/Player';
import { locations } from './data/locations';
import { craftingRecipes, CraftingRecipe } from './data/crafting';
import { updateUI, addMessage, shakeButton, updateCraftingMenu } from './utils/ui'; // Import updateCraftingMenu
import { Weather, weatherTypes } from './game/Weather';
import { toggleFlashlight, fight } from './game/Actions';
import { FirstAidKit, useFirstAidKit } from './game/FirstAidKit'; // Correctly import the FirstAidKit class and useFirstAidKit
import { craft } from './game/Crafting';
import { move } from './game/Movement';
import { updateActionsUI } from './ui/actionsUI';
import { updateInventoryUI } from './ui/inventoryUI';
import { setupCraftingModal } from './ui/craftingUI';

export class Game {
    private player: Player;
    private currentLocation: GameLocation;
    private locations: GameLocation[];
    private craftingRecipes: CraftingRecipe[];
    private flashlightOn: boolean = false;
    private time: number = 0; // 0-23 hours
    private day: number = 1;
    private currentWeather: Weather;
    private inventory = {
        cloth: 1,
        alcohol: 1
    };

    constructor() {
        this.player = new Player();
        this.locations = locations;
        this.currentLocation = this.locations[0];
        this.craftingRecipes = craftingRecipes;
        this.flashlightOn = false;
        this.time = 0;
        this.day = 1;
        this.currentWeather = this.getRandomWeather(); // Initialize weather

        updateUI(this);
        setupCraftingModal(this); // Setup crafting modal
    }

    private applyTimeEffects() {
        if (this.time >= 22 || this.time < 6) {
            // Night time effects
            this.currentLocation.hasZombie = Math.random() < 0.3; // 30% chance of zombie encounter at night
            if (!this.flashlightOn) {
                addMessage("It's dark. You might want to use your flashlight.");
            }
        } else {
            // Day time effects
            this.currentLocation.hasZombie = Math.random() < 0.1; // 10% chance of zombie encounter during the day
        }

        if (['Rainy', 'Stormy'].includes(this.currentWeather.type) && Math.random() < 0.2) {
            this.player.health.takeDamage('head', 5);
            addMessage("You've caught a cold from the bad weather. [-5 Health]");
        }
    }

    private getRandomWeather(): Weather {
        return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    }

    public advanceTime(hours: number): void {
        this.time += hours;
        while (this.time >= 24) {
            this.time -= 24;
            this.day++;
            addMessage(`Day ${this.day} has begun.`);
        }
        this.applyTimeEffects();
        if (Math.random() < 0.2) { // 20% chance of weather change every hour
            this.currentWeather = this.getRandomWeather();
            addMessage(`The weather has changed: ${this.currentWeather.description}`);
        }
        updateUI(this);
    }

    public search(): void {
        const searchChance = this.flashlightOn ? 0.8 : 0.5;
        if (Math.random() < searchChance && this.currentLocation.items.length > 0) {
            const item = this.currentLocation.items.pop();
            if (item) {
                this.player.inventory.push(item);
                addMessage(`You found a ${item.name}!`);
            }
        } else {
            addMessage("You didn't find anything useful.");
            const searchButton = document.querySelector('.search-button');
            if (searchButton) shakeButton(searchButton as HTMLElement);
        }
        updateUI(this);
        console.log('updateUI called after search'); // Add this line
        this.advanceTime(1); // Searching takes 1 hour
    }

    public move(): void {
        move(this);
    }

    public equipItem(itemName: string): void {
        const item = this.player.inventory.find(item => item.name === itemName);
        if (!item) return;

        let slot: keyof Player['equipment'] | null = null;
        if (item.type === 'meleeWeapon') slot = 'meleeWeapon';
        else if (item.type === 'rangedWeapon') slot = 'rangedWeapon';
        else if (item.type === 'armor') slot = 'armor';

        if (slot) {
            if (this.player.equipment[slot]) {
                this.player.inventory.push(this.player.equipment[slot]!);
            }
            this.player.equipment[slot] = item;
            this.player.inventory = this.player.inventory.filter(i => i !== item);
            addMessage(`You equipped ${item.name}.`);
        } else {
            addMessage(`You can't equip ${item.name}.`);
        }
        updateUI(this);
    }

    public unequipItem(slot: keyof Player['equipment']): void {
        const item = this.player.equipment[slot];
        if (item) {
            this.player.inventory.push(item);
            this.player.equipment[slot] = null;
            addMessage(`You unequipped ${item.name}.`);
            updateUI(this);
        }
    }

    public useAmmo(ammoType: string, amount: number): boolean {
        if (this.player.ammo[ammoType] >= amount) {
            this.player.ammo[ammoType] -= amount;
            return true;
        }
        return false;
    }

    public useItem(itemName: string): void {
        const itemIndex = this.player.inventory.findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            const item = this.player.inventory[itemIndex];
            if (item.type === 'food') {
                const hungerIncrease = item.effect || 0;
                this.player.hunger = Math.min(100, this.player.hunger + hungerIncrease);
                this.player.inventory.splice(itemIndex, 1);
                addMessage(`You used ${item.name}. Your hunger increased by [+${hungerIncrease}].`);
                this.advanceTime(0.5); // Eating takes 30 minutes
            } else if (item.name === 'Flashlight') {
                const flashlight = item as Tool; // Cast to Tool
                toggleFlashlight(this, flashlight); // Now this should work
            } else if (item.type === 'medical') {
                const result = useFirstAidKit(this.player, 'head'); // Pass the body part name as a string
                if (result) {
                    this.advanceTime(1); // Only advance time if healing was successful
                }
            }
        }
        updateUI(this);
    }

    public fight(): void {
        fight(this);
    }

    public craft(recipeName: string): void {
        const recipe = this.craftingRecipes.find(r => r.name === recipeName);
        if (!recipe) return;

        const canCraft = recipe.components.every(component => {
            const item = this.player.inventory.find(i => i.name === component.name);
            return item && (item.quantity ?? 0) >= component.quantity; // Use 0 if item.quantity is undefined
        });

        if (canCraft) {
            recipe.components.forEach(component => {
                const item = this.player.inventory.find(i => i.name === component.name);
                if (item) {
                    item.quantity = (item.quantity ?? 0) - component.quantity; // Use 0 if item.quantity is undefined
                }
            });

            const craftedItem = { ...recipe.result, quantity: 1 };
            this.player.inventory.push(craftedItem);
            addMessage(`You crafted a ${recipe.name}!`);
            this.updateUI();
        } else {
            alert('Not enough materials to craft this item.');
        }
    }

    public talkToNPC(): void {
        const npc = this.currentLocation.npc;
        if (npc) {
            addMessage(`${npc.name} says: "${npc.dialogue}"`);
            if (npc.quest && !npc.questCompleted) {
                addMessage(`${npc.name} offers you a quest: ${npc.quest.description}`);
                // Implement quest acceptance logic here
            }
        } else {
            addMessage("There's no one here to talk to.");
        }
        updateUI(this);
        this.advanceTime(0.5); // Talking takes 30 minutes
    }

    public completeQuest(): void {
        const npc = this.currentLocation.npc;
        if (npc && npc.quest && !npc.questCompleted) {
            const questItem = this.player.inventory.find(item => item.name === npc.quest?.requiredItem);
            if (questItem) {
                const itemIndex = this.player.inventory.indexOf(questItem);
                this.player.inventory.splice(itemIndex, 1);
                npc.questCompleted = true;
                addMessage(`You completed ${npc.name}'s quest and received a reward!`);
                this.player.inventory.push(npc.quest.reward);
            } else {
                addMessage(`You don't have the required item to complete ${npc.name}'s quest.`);
            }
        } else {
            addMessage("There's no active quest to complete here.");
        }
        updateUI(this);
        this.advanceTime(1); // Completing a quest takes 1 hour
    }

    public getTotalHealth(): number {
        return this.player.health.getOverallHealth();
    }

    public useFirstAidKit(): void {
        const firstAidKit = this.player.inventory.find(item => item.name === "First Aid Kit");
        if (firstAidKit) {
            for (const part in this.player.health.bodyParts) {
                this.player.health.heal(part, 20);
                this.player.health.stopBleeding(part);
            }
            this.player.inventory = this.player.inventory.filter(item => item !== firstAidKit);
            addMessage("You used a First Aid Kit. All body parts have been healed and bleeding stopped.");
        } else {
            addMessage("You don't have a First Aid Kit.");
        }
        this.advanceTime(1); // Using a First Aid Kit takes 1 hour
    }

    public useAntibiotics(): void {
        const antibiotics = this.player.inventory.find(item => item.name === "Antibiotics");
        if (antibiotics) {
            for (const part in this.player.health.bodyParts) {
                this.player.health.cureInfection(part);
            }
            this.player.inventory = this.player.inventory.filter(item => item !== antibiotics);
            addMessage("You used Antibiotics. All infections have been cured.");
        } else {
            addMessage("You don't have any Antibiotics.");
        }
        this.advanceTime(1); // Using Antibiotics takes 1 hour
    }

    // Add public getter methods
    public getDay(): number {
        return this.day;
    }

    public getTime(): number {
        return this.time;
    }

    public getCurrentWeather(): Weather {
        return this.currentWeather;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getCurrentLocation(): GameLocation {
        return this.currentLocation;
    }

    public getLocations(): GameLocation[] {
        return this.locations;
    }

    public getCraftingRecipes(): CraftingRecipe[] {
        return this.craftingRecipes;
    }

    public isFlashlightOn(): boolean {
        return this.flashlightOn;
    }

    public setFlashlightOn(value: boolean): void {
        this.flashlightOn = value;
    }

    public changeLocation(newLocationIndex: number): void {
        this.currentLocation = this.locations[newLocationIndex];
    }

    public openCraftingMenu(): void {
        document.getElementById('crafting-modal')?.classList.remove('hidden');
    }

    public closeCraftingMenu(): void {
        document.getElementById('crafting-modal')?.classList.add('hidden');
    }

    public updateUI(): void {
        console.log('updateUI called'); // Add this line
        document.getElementById('actions')!.innerHTML = updateActionsUI(this);
        document.getElementById('inventory')!.innerHTML = updateInventoryUI(this);
        console.log('Calling updateCraftingMenu'); // Add this line
        updateCraftingMenu(this.player.inventory.map(item => item.name.toLowerCase())); // Update crafting menu
    }
}

declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game();