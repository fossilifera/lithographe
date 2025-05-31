import { ColumnMetadata } from './column-metadata';

describe('ColumnMetadata', () => {
  it('should create an instance', () => {
    expect(new ColumnMetadata(0, "toto")).toBeTruthy();
  });

  it.each([
    ['toto', 'toto'],
    ['Capital', 'capital'],
    ['key with spaces', 'key_with_spaces'],
    ['Key With Spaces & Capitals', 'key_with_spaces__capitals'],
    ['key?', "key"],
    ['key\\', "key"]
  ])
  ('should transform display name = %s to regular json attribute key = %s', (importedName: string, expectJsonName: string) => {
    const columnMetadata = new ColumnMetadata(0, importedName);
    expect(columnMetadata.jsonName).toBe(expectJsonName)
  });
});
