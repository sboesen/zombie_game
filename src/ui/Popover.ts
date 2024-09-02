export class Popover {
    private currentPopover: HTMLElement | null = null;

    public show(event: MouseEvent, content: string): void {
        this.hide(); // Close any existing popover

        const popover = document.createElement('div');
        popover.className = 'item-popover absolute bg-gray-800 border border-gray-600 p-2 rounded shadow-lg z-10';
        popover.style.left = `${event.clientX + 10}px`;
        popover.style.top = `${event.clientY + 10}px`;
        popover.innerHTML = content;
        document.body.appendChild(popover);
        this.currentPopover = popover; // Keep track of the current popover
    }

    public hide(): void {
        if (this.currentPopover) {
            this.currentPopover.remove();
            this.currentPopover = null; // Reset the current popover
        }
    }
}