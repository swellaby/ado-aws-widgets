import * as SDK from 'azure-devops-extension-sdk';

export const LOAD_ERR = 'Failed to load'
const UNIT_SIZE = 160;
const GUTTER_SIZE = 10;

export function getSideLength(units: number): number {
    return (UNIT_SIZE * units) + (GUTTER_SIZE * (units - 1));
}

export async function init(name, fn: () => {}): Promise<void> {
    SDK.init();
    await SDK.ready();
    SDK.register(name, fn);
}
