import {Logger} from './logger';

describe('LoggerService', () => {

  it('should be created', () => {
    expect(new Logger("Test")).toBeTruthy();
  });
});
