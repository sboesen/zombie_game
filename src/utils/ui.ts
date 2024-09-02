import { Game } from '../game';
import { updateActionsUI } from '../ui/actionsUI';
import { updateEquipmentUI } from '../ui/equipmentUI';
import { updateHealthUI } from '../ui/healthUI';
import { updateInventoryUI } from '../ui/inventoryUI';
import { updateStatusUI } from '../ui/statusUI';
import { Popover } from '../ui/Popover';

const popover = new Popover();

export function updateUI(game: Game): void {
    const locationEl = document.getElementById("location") as HTMLElement;
    const statusEl = document.getElementById("status") as HTMLElement;
    const healthStatusEl = document.getElementById("health-status") as HTMLElement;
    const inventoryEl = document.getElementById("inventory") as HTMLElement;
    const actionsEl = document.getElementById("actions") as HTMLElement;
    const equipmentEl = document.getElementById("equipment") as HTMLElement;

    if (locationEl) locationEl.innerHTML = `
        <h2 class="text-2xl font-bold mb-2 text-yellow-300">${game.getCurrentLocation().name}</h2>
        <p class="text-gray-300">${game.getCurrentLocation().description}</p>
    `;

    if (statusEl) statusEl.innerHTML = updateStatusUI(game);
    if (healthStatusEl) healthStatusEl.innerHTML = updateHealthUI(game);
    if (inventoryEl) inventoryEl.innerHTML = updateInventoryUI(game);
    if (actionsEl) actionsEl.innerHTML = updateActionsUI(game);
    if (equipmentEl) equipmentEl.innerHTML = updateEquipmentUI(game);

    addButtonListeners();
    addItemHoverListeners();
    addStatusHoverListeners();
}

export function addMessage(message: string): void {
    const messageLogEl = document.getElementById("message-log");
    if (messageLogEl) {
        const messageEl = document.createElement("p");
        
        // Regular expression to match [+X] or [-X] patterns
        const regex = /\[([+-]\d+)\]/g;
        
        // Replace matched patterns with colored spans
        const coloredMessage = message.replace(regex, (match, number) => {
            const value = parseInt(number);
            let color = 'text-white'; // Default color
            
            if (message.toLowerCase().includes('hunger')) {
                color = value > 0 ? 'text-orange-400' : 'text-orange-600';
            } else if (message.toLowerCase().includes('health')) {
                color = value > 0 ? 'text-red-400' : 'text-red-600';
            }
            
            return `<span class="${color}">[${number}]</span>`;
        });

        messageEl.innerHTML = coloredMessage;
        messageEl.classList.add("mb-1", "pulse", "text-gray-300");
        messageLogEl.appendChild(messageEl);
        messageLogEl.scrollTop = messageLogEl.scrollHeight;
    }
}

function addButtonListeners() {
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('pulse');
            addHapticFeedback();
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 500);
        });
    });
}

function addHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

export function shakeButton(buttonElement: HTMLElement) {
    buttonElement.classList.add('shake');
    setTimeout(() => {
        buttonElement.classList.remove('shake');
    }, 500);
}

function addItemHoverListeners() {
    const itemNames = document.querySelectorAll('.item-name');
    itemNames.forEach(itemName => {
        (itemName as HTMLElement).addEventListener('mousemove', (event) => showItemPopover(event as MouseEvent, itemName as HTMLElement));
        (itemName as HTMLElement).addEventListener('mouseleave', () => popover.hide());
    });
}

function showItemPopover(event: MouseEvent, itemNameElement: HTMLElement) {
    const item = JSON.parse(itemNameElement.getAttribute('data-item') || '{}');
    const content = `
        <p class="font-bold">${item.name}</p>
        <p>${item.description}</p>
        ${item.effect ? `<p>Effect: ${item.effect}</p>` : ''}
        ${item.durability !== undefined ? `<p>Durability: ${item.durability}/${item.maxDurability}</p>` : ''}
    `;
    popover.show(event, content);
}

function addStatusHoverListeners() {
    const healthStatus = document.querySelector('.health-status');
    const hungerStatus = document.querySelector('.hunger-status');
    const weatherStatus = document.querySelector('.weather-status');

    if (healthStatus) {
        healthStatus.addEventListener('mouseover', (event: Event) => showHealthPopover(event as MouseEvent));
        healthStatus.addEventListener('mouseout', () => popover.hide());
    }

    if (hungerStatus) {
        hungerStatus.addEventListener('mouseover', (event: Event) => showHungerPopover(event as MouseEvent));
        hungerStatus.addEventListener('mouseout', () => popover.hide());
    }

    if (weatherStatus) {
        weatherStatus.addEventListener('mouseover', (event: Event) => showWeatherPopover(event as MouseEvent));
        weatherStatus.addEventListener('mouseout', () => popover.hide());
    }
}

function showHealthPopover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const health = parseInt(target.getAttribute('data-health') || '0');
    let summary = '';
    let effects = '';

    if (health > 300) {
        summary = 'Healthy';
        effects = 'No negative effects';
    } else if (health > 200) {
        summary = 'Injured';
        effects = 'Slightly reduced combat effectiveness';
    } else if (health > 100) {
        summary = 'Badly Injured';
        effects = 'Reduced combat effectiveness, slower movement';
    } else {
        summary = 'Critical';
        effects = 'Severely reduced combat effectiveness, very slow movement';
    }

    const content = `
        <h3 class="font-bold text-blue-300">Health</h3>
        <p class="text-yellow-300">${summary}</p>
        <p class="text-gray-300">${effects}</p>
    `;
    popover.show(event, content);
}

function showHungerPopover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const hunger = parseInt(target.getAttribute('data-hunger') || '0');
    let summary = '';
    let effects = '';

    if (hunger > 75) {
        summary = 'Satisfied';
        effects = 'No negative effects';
    } else if (hunger > 50) {
        summary = 'Peckish';
        effects = 'Slightly reduced stamina regeneration';
    } else if (hunger > 25) {
        summary = 'Hungry';
        effects = 'Reduced stamina regeneration, slight health loss over time';
    } else {
        summary = 'Starving';
        effects = 'No stamina regeneration, continuous health loss';
    }

    const content = `
        <h3 class="font-bold text-blue-300">Hunger</h3>
        <p class="text-yellow-300">${summary}</p>
        <p class="text-gray-300">${effects}</p>
    `;
    popover.show(event, content);
}

function showWeatherPopover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const weather = JSON.parse(target.getAttribute('data-weather') || '{}');
    const content = `
        <h3 class="font-bold text-blue-300">Weather</h3>
        <p class="text-yellow-300">${weather.type}</p>
        <p class="text-gray-300">${weather.description} ${weather.effect}</p>
    `;
    popover.show(event, content);
}

export function updateCraftingMenu(inventory: string[]): void {
    console.log('updateCraftingMenu called');
    console.log('Updating crafting menu with inventory:', inventory);

    const craftingItems = document.querySelectorAll('#crafting-menu [data-item]');
    console.log('Found crafting items:', craftingItems.length); // Add this line

    if (craftingItems.length === 0) {
        console.log('No crafting items found in the DOM.'); // Add this line
    }

    craftingItems.forEach((element) => {
        const itemElement = element as HTMLElement;
        const itemName = itemElement.getAttribute('data-item')?.toLowerCase();
        
        console.log('Processing item:', itemName); // Log the item being processed

        if (itemName) {
            if (inventory.includes(itemName)) {
                console.log(`Item ${itemName} is in inventory. Setting to green.`); // Log if item is in inventory
                itemElement.classList.remove('text-red-500');
                itemElement.classList.add('text-green-500');
            } else {
                console.log(`Item ${itemName} is not in inventory. Setting to red.`); // Log if item is not in inventory
                itemElement.classList.remove('text-green-500');
                itemElement.classList.add('text-red-500');
            }
        }
    });
}