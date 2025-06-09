import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Jest does not support ESM (used by csv parse)
jest.mock('csv-parse/browser/esm/sync', () => ({
  parse: jest.fn()
}));

// matchMedia is not implemented in JSDOM (cf. https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
