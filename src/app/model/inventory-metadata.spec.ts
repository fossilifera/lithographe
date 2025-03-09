import { InventoryMetadata } from './inventory-metadata';

describe('InventoryMetadata', () => {
  it('should create an instance', () => {
    expect(new InventoryMetadata('title of the inventory.csv', [])).toBeTruthy();
  });
});
