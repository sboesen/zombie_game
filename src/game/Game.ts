import { Player } from './Player';
import { Zombie } from './Zombie';
import { GameLocation } from './Location';
import { locations } from '../data/locations';
import { CraftingRecipe } from './CraftingRecipe';
import { craftingRecipes } from './Crafting';
import { Weather, weatherTypes } from './Weather';
import { addMessage, updateUI, shakeButton, updateCraftingMenu } from '../utils/ui'; // Ensure these imports are correct
import { FirstAidKit } from './FirstAidKit'; // Import FirstAidKit
import { toggleFlashlight } from './Actions';
import { updateActionsUI } from '../ui/actionsUI';
import { updateInventoryUI } from '../ui/inventoryUI';
import { Tool } from './Tool';
import { renderFightUI, updateFightUI } from '../utils/fightUI';
import { Map } from './Map';

export class Game {
    private player: Player;
    private currentLocation: GameLocation;
    private locations: GameLocation[];
    private craftingRecipes: CraftingRecipe[];
    private flashlightOn: boolean = false; // Track flashlight state
    private time: number = 0; // 0-23 hours
    private day: number = 1;
    private currentWeather: Weather;
    private isInFightMode: boolean = false;
    private currentZombie: Zombie | null = null;
    private fightLoop: (() => void) | null = null;
    private map: Map;

    constructor() {
        this.player = new Player();
        this.locations = locations;
        this.currentLocation = this.locations[0];
        this.craftingRecipes = craftingRecipes;
        this.currentWeather = this.getRandomWeather(); // Initialize weather
        this.map = new Map(this.locations);

        updateUI(this);
    }

    private applyTimeEffects() {
        if (this.time >= 22 || this.time < 6) {
            // Night time effects
            this.currentLocation.zombieChance = 0.3; // 30% chance of zombie encounter at night
            if (!this.flashlightOn) {
                addMessage("It's dark. You might want to use your flashlight.");
            }
        } else {
            // Day time effects
            this.currentLocation.zombieChance = 0.1; // 10% chance of zombie encounter during the day
        }

        if (['Rainy', 'Stormy'].includes(this.currentWeather.type) && Math.random() < 0.2) {
            this.player.health.takeDamage(5); // Adjusted to take damage directly
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
        this.advanceTime(1); // Searching takes 1 hour
    }

    public move(): void {
        console.log('Move method started');

        const newLocation = this.map.getRandomLocation(this.currentLocation);
        console.log('New location selected:', newLocation.name);

        this.currentLocation = newLocation;
        console.log('Current location updated');

        addMessage(`You moved to ${newLocation.name}.`);
        console.log('Message added');

        console.log('Calling updateUI');
        this.updateUI();
        console.log('updateUI completed');

        console.log('Checking for zombies');
        this.checkForZombies();
        console.log('Zombie check completed');

        let moveTime = 2;
        if (this.currentWeather.type === 'Rainy') moveTime = 3;
        if (this.currentWeather.type === 'Stormy') moveTime = 4;
        console.log('Move time calculated:', moveTime);

        console.log('Advancing time');
        this.advanceTime(moveTime);
        console.log('Time advanced');

        if (['Rainy', 'Stormy'].includes(this.currentWeather.type) && Math.random() < 0.2) {
            console.log('Bad weather effect triggered');
            this.player.health.takeDamage(5);
            addMessage("You've caught a cold from the bad weather. [-5 Health]");
        }

        console.log('Move method completed');
    }

    public fight(): void {
        if (this.isInFightMode) return; // Don't start a new fight if already in one

        
        const zombie = this.getCurrentLocation().getRandomZombie(); // Create a new zombie
        this.setCurrentZombie(zombie);
        this.isInFightMode = true;

        addMessage(`A ${zombie.type} zombie appears! Prepare for battle!`);

        // Render the fight UI
        renderFightUI(this.player, zombie);

        // Set up the fight loop
        const fightLoop = () => {
            if (this.player.health.getOverallHealth() <= 0) {
                this.gameOver();
                return;
            }

            if (zombie.health <= 0) {
                addMessage("You've defeated the zombie!");
                this.player.experience += zombie.experienceReward;
                addMessage(`You gained ${zombie.experienceReward} experience.`);
                this.resumeNormalGameplay();
                return;
            }

            // Update the fight UI
            updateFightUI(this.player, zombie);

            // The fight continues...
            setTimeout(() => {
                if (this.isInFightMode) {
                    this.fightLoop?.();
                }
            }, 1000); // 1 second delay between rounds
        };

        this.setFightMode(true, fightLoop);
    }

    public gameOver(): void {
        // Implement game over logic
        console.log("Game Over");
    }

    public resumeNormalGameplay(): void {
        this.isInFightMode = false;
        this.currentZombie = null;
        this.fightLoop = null;
        document.getElementById('fight-container')?.remove();
    }

    public setFightMode(isInFight: boolean, fightLoop: () => void): void {
        this.isInFightMode = isInFight;
        this.fightLoop = fightLoop;
        if (isInFight) {
            this.fightLoop();
        }
    }

    public continueFight(): void {
        if (this.isInFightMode && this.fightLoop) {
            this.fightLoop(); // Call the fight loop to continue the fight
        }
    }

    public getCurrentZombie(): Zombie {
        if (!this.currentZombie) {
            throw new Error("No current zombie in fight");
        }
        return this.currentZombie;
    }

    public setCurrentZombie(zombie: Zombie): void {
        this.currentZombie = zombie;
    }

    public getPlayer(): Player {
        return this.player;
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
            } else if (item.name === 'First Aid Kit') {
                const healAmount = 50; // Adjust this value as needed
                const healedAmount = this.player.health.heal(healAmount);
                this.player.inventory.splice(itemIndex, 1);
                addMessage(`You used a First Aid Kit. Healed [+${healedAmount}] health.`);
                this.advanceTime(1); // Using a First Aid Kit takes 1 hour
            } else if (item.name === 'Antibiotics') {
                // Implement antibiotics effect here
                this.player.inventory.splice(itemIndex, 1);
                addMessage(`You used Antibiotics. Your immune system is strengthened.`);
                this.advanceTime(0.5); // Using Antibiotics takes 30 minutes
            }
        } else {
            addMessage(`You don't have a ${itemName} in your inventory.`);
        }
        updateUI(this);
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
        console.log('talkToNPC called');
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

    public getTotalHealth(): number {
        return this.player.health.getOverallHealth();
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

    public getLocations(): GameLocation[] {
        return this.locations;
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

    public updateUI(message?: string): void {
        console.log('updateUI called');
        
        const locationNameElement = document.getElementById('location-name');
        const locationDescriptionElement = document.getElementById('location-description');
        const itemsListElement = document.getElementById('items-list');
        const actionsElement = document.getElementById('actions');
        const inventoryElement = document.getElementById('inventory');

        if (locationNameElement) {
            locationNameElement.textContent = this.currentLocation.name;
        } else {
            console.error('location-name element not found');
        }

        if (locationDescriptionElement) {
            locationDescriptionElement.textContent = this.currentLocation.description;
        } else {
            console.error('location-description element not found');
        }

        if (itemsListElement) {
            itemsListElement.innerHTML = '';
            this.currentLocation.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                itemsListElement.appendChild(li);
            });
        } else {
            console.error('items-list element not found');
        }

        if (message) {
            const messageElement = document.getElementById('message');
            if (messageElement) {
                messageElement.textContent = message;
            } else {
                console.error('message element not found');
            }
        }

        if (actionsElement) {
            actionsElement.innerHTML = updateActionsUI(this);
        } else {
            console.error('actions element not found');
        }

        if (inventoryElement) {
            inventoryElement.innerHTML = updateInventoryUI(this);
        } else {
            console.error('inventory element not found');
        }

        console.log('Calling updateCraftingMenu');
        updateCraftingMenu(this.player.inventory.map(item => item.name.toLowerCase()));

        console.log('updateUI completed');
    }

    getCurrentLocation(): GameLocation {
        return this.currentLocation;
    }

    // Method to check if the flashlight is on
    public isFlashlightOn(): boolean {
        return this.flashlightOn;
    }

    // Method to set the flashlight state
    public setFlashlightOn(state: boolean): void {
        this.flashlightOn = state;
    }

    checkForZombies(): void {
        if (Math.random() < this.currentLocation.zombieChance) {
            this.fight();
        } else {
            addMessage("The area seems clear for now.");
        }
    }
}

declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game();