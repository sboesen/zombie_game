import { Player } from './Player';
import { Zombie } from './Zombie';
import { GameLocation } from './Location';
import { locations } from '../data/locations';
import { CraftingRecipe } from './CraftingRecipe';
import { craftingRecipes } from './Crafting';
import { Weather, weatherTypes } from './Weather';
import { addMessage, updateUI, shakeButton, updateCraftingMenu } from '../utils/ui';
import { FirstAidKit } from './FirstAidKit';
import { toggleFlashlight } from './Actions';
import { updateActionsUI } from '../ui/actionsUI';
import { updateInventoryUI } from '../ui/inventoryUI';
import { Tool } from './Tool';
import { renderFightUI, updateFightUI } from '../ui/fightUI';
import { Map } from './Map';
import { Item } from './Item';
import { showVictoryModal } from '../ui/victoryModal';
import { ZombieType } from './ZombieType';

export class Game {
    private player: Player;
    private currentLocation: GameLocation;
    private locations: GameLocation[];
    private craftingRecipes: CraftingRecipe[];
    private flashlightOn: boolean = false;
    private time: number = 0;
    private day: number = 1;
    private currentWeather: Weather;
    private isInFightMode: boolean = false;
    private currentZombie: Zombie | null = null;
    private fightLoop: (() => void) | null = null;
    private map: Map;
    private isHandlingZombieDefeat: boolean = false;

    constructor() {
        this.player = new Player();
        this.locations = locations;
        this.currentLocation = this.locations[0];
        this.craftingRecipes = craftingRecipes;
        this.currentWeather = this.getRandomWeather();
        this.map = new Map(this.locations);

        updateUI(this);
    }

    private applyTimeEffects() {
        const isNight = this.time >= 22 || this.time < 6;
        
        this.currentLocation.attemptZombieSpawn(isNight);
        
        if (isNight && !this.flashlightOn) {
            addMessage("It's dark. You might want to use your flashlight.");
        }

        if (['Rainy', 'Stormy'].includes(this.currentWeather.type) && Math.random() < 0.2) {
            this.player.healthSystem.takeDamage(5);
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
        if (Math.random() < 0.2) {
            this.currentWeather = this.getRandomWeather();
            addMessage(`The weather has changed: ${this.currentWeather.description}`);
        }
        this.checkForZombies(hours);
        updateUI(this);
    }

    checkForZombies(hours: number) {
        const spawnChance = 0.1 * hours; // 10% chance per hour
        
        if (Math.random() < spawnChance) {
            const zombieType = this.getRandomZombieType();
            const newZombie = new Zombie(zombieType);
            this.currentLocation.addZombie(newZombie);
            
            addMessage(`A ${zombieType} zombie has appeared!`);
            this.fight(); // Initiate fight immediately when a zombie spawns
        } else {
            console.log("No zombies spawned during this time period.");
        }
    }

    private getRandomZombieType(): ZombieType {
        const types = [ZombieType.CRAWLER, ZombieType.WALKER, ZombieType.BLOATER];
        return types[Math.floor(Math.random() * types.length)];
    }

    public fight(): void {
        if (this.isInFightMode) return;

        const zombies = this.currentLocation.getZombies();
        if (zombies.length === 0) {
            addMessage("No zombies to fight here.");
            return;
        }

        const zombie = zombies[0]; // Get the first zombie
        this.setCurrentZombie(zombie);
        this.isInFightMode = true;

        addMessage(`A ${zombie.type.name} zombie appears! Prepare for battle!`);

        renderFightUI(this.player, zombie);

        const fightLoop = () => {
            if (this.player.healthSystem.getCurrentHealth() <= 0) {
                addMessage("You have been defeated. Game over.");
                this.gameOver();
                return;
            }
            
            if (zombie.healthSystem.getCurrentHealth() <= 0) {
                this.handleZombieDefeat(zombie);
                return;
            }
            
            updateFightUI(this.player, zombie);

            if (this.isInFightMode) {
                requestAnimationFrame(fightLoop);
            }
        };

        this.setFightMode(true, fightLoop);
        fightLoop(); // Start the fight loop
    }

    public search(): void {
        const searchChance = this.flashlightOn ? 0.8 : 0.5;
        if (Math.random() < searchChance && this.currentLocation.getItems().length > 0) {
            const item = this.currentLocation.getItems().pop();
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
        this.advanceTime(1);
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

        let moveTime = 2;
        if (this.currentWeather.type === 'Rainy') moveTime = 3;
        if (this.currentWeather.type === 'Stormy') moveTime = 4;
        console.log('Move time calculated:', moveTime);

        console.log('Advancing time');
        this.advanceTime(moveTime);
        console.log('Time advanced');

        if (['Rainy', 'Stormy'].includes(this.currentWeather.type) && Math.random() < 0.2) {
            console.log('Bad weather effect triggered');
            this.player.healthSystem.takeDamage(5);
            addMessage("You've caught a cold from the bad weather. [-5 Health]");
        }

        console.log('Move method completed');
    }

    private getZombieHealth(zombieType: string): number {
        switch (zombieType) {
            case 'Normal': return 100;
            case 'Fast': return 75;
            case 'Strong': return 150;
            default: return 100;
        }
    }

    private getZombieDamage(zombieType: string): number {
        switch (zombieType) {
            case 'Normal': return 10;
            case 'Fast': return 15;
            case 'Strong': return 20;
            default: return 10;
        }
    }

    public gameOver(): void {
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
            this.fightLoop();
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
                this.advanceTime(0.5);
            } else if (item.name === 'Flashlight') {
                const flashlight = item as Tool;
                toggleFlashlight(this, flashlight);
            } else if (item.name === 'First Aid Kit') {
                const healAmount = 50;
                const healedAmount = this.player.healthSystem.heal(healAmount);
                this.player.inventory.splice(itemIndex, 1);
                addMessage(`You used a First Aid Kit. Healed [+${healedAmount}] health.`);
                this.advanceTime(1);
            } else if (item.name === 'Antibiotics') {
                this.player.inventory.splice(itemIndex, 1);
                addMessage(`You used Antibiotics. Your immune system is strengthened.`);
                this.advanceTime(0.5);
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
            return item && (item.quantity ?? 0) >= component.quantity;
        });

        if (canCraft) {
            recipe.components.forEach(component => {
                const item = this.player.inventory.find(i => i.name === component.name);
                if (item) {
                    item.quantity = (item.quantity ?? 0) - component.quantity;
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
            }
        } else {
            addMessage("There's no one here to talk to.");
        }
        updateUI(this);
        this.advanceTime(0.5);
    }

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
            this.currentLocation.getItems().forEach(item => {
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

    public isFlashlightOn(): boolean {
        return this.flashlightOn;
    }

    public setFlashlightOn(state: boolean): void {
        this.flashlightOn = state;
    }

    public handleZombieDefeat(zombie: Zombie): void {
        console.log('handleZombieDefeat called');
        if (this.isHandlingZombieDefeat) return;
        this.isHandlingZombieDefeat = true;

        const loot = this.generateLoot(zombie);
        const xpGained = this.calculateXP(zombie);

        // Add loot to player's inventory
        this.player.addItems(loot);

        // Add XP to player
        this.player.addXP(xpGained);

        // Remove the defeated zombie from the current location
        this.currentLocation.removeZombie(zombie);

        // Show the victory modal
        showVictoryModal(this.player, zombie, loot, xpGained);

        // Update the game UI
        this.updateUI();

        this.isHandlingZombieDefeat = false;
    }

    private generateLoot(zombie: Zombie): Item[] {
        // Implement loot generation logic here
        // This is a simple example; you might want to make this more complex
        const lootChance = Math.random();
        if (lootChance < 0.7) { // 70% chance to get loot
            return [new Item("Zombie Flesh", "A piece of rotting zombie flesh.", "misc", 1, 1)];
        } else if (lootChance < 0.9) { // 20% chance to get better loot
            return [new Item("Bandage", "A simple bandage to stop bleeding.", "medical", 10, 1)];
        } else { // 10% chance to get rare loot
            return [new Item("First Aid Kit", "A complete first aid kit.", "medical", 50, 1)];
        }
    }

    private calculateXP(zombie: Zombie): number {
        // Implement XP calculation logic here
        // This is a simple example; you might want to make this more complex
        switch (zombie.type) {
            case ZombieType.CRAWLER:
                return 10;
            case ZombieType.WALKER:
                return 20;
            case ZombieType.BLOATER:
                return 30;
            default:
                return 5;
        }
    }
}

declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game();