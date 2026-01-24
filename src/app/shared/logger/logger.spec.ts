import {Logger} from './logger';
import {describe, expect, it} from 'vitest';

describe('LoggerService', () => {

  it('should be created', () => {
    expect(new Logger("Test")).toBeTruthy();
  });
});
