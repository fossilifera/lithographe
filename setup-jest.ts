import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Jest does not support ESM (used by csv parse)
jest.mock('csv-parse/browser/esm/sync', () => ({
  parse: jest.fn()
}));
