export interface ItemData {
    name: string;
    description: string;
    farmLocation: string;
}

export const items: ItemData[] = [
    { name: 'Empty Bottle', description: 'A bottle that can be filled with liquids.', farmLocation: 'Abandoned houses, supermarkets' },
    { name: 'Gasoline', description: 'Fuel for vehicles and other uses.', farmLocation: 'Gas stations, garages' },
    { name: 'Rag', description: 'A piece of cloth.', farmLocation: 'Clothing stores, houses' },
    { name: 'Baseball Bat', description: 'A sturdy bat for hitting.', farmLocation: 'Sports stores, schools' },
    { name: 'Nails', description: 'Sharp metal pieces.', farmLocation: 'Hardware stores, construction sites' },
    { name: 'Duct Tape', description: 'Strong adhesive tape.', farmLocation: 'Hardware stores, garages' },
    { name: 'Plastic Container', description: 'A container for storing items.', farmLocation: 'Supermarkets, houses' },
    { name: 'Charcoal', description: 'Burnt wood used for filtering.', farmLocation: 'Camping sites, BBQ areas' },
    { name: 'Sand', description: 'Fine granular material.', farmLocation: 'Beaches, construction sites' },
    { name: 'Cloth', description: 'A piece of fabric.', farmLocation: 'Clothing stores, houses' },
    { name: 'Hairpin', description: 'A small pin for hair.', farmLocation: 'Houses, beauty salons' },
    { name: 'File', description: 'A tool for smoothing surfaces.', farmLocation: 'Hardware stores, workshops' },
    { name: 'Clean Cloth', description: 'A clean piece of fabric.', farmLocation: 'Clothing stores, houses' },
    { name: 'Alcohol', description: 'A disinfectant liquid.', farmLocation: 'Pharmacies, hospitals' },
    // Add other items here...
];