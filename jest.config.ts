import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';
import * as structuredClone from '@ungap/structured-clone';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  verbose: true,
  globals: {
    structuredClone: structuredClone,
  }
} satisfies Config;
