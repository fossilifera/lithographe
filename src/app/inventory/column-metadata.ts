export class ColumnMetadata {
  readonly position: number;
  readonly displayName: string;
  readonly jsonName: string;

  // TODO passer en interface
  constructor(position: number, displayName: string, jsonName: string = this.transformToAsciiSafeName(displayName)) {
    this.position = position;
    this.displayName = displayName;
    this.jsonName= jsonName;
  }

  private transformToAsciiSafeName(name: string) : string {
    return name
        .replaceAll(" ", "_")
        .replaceAll(/[^a-zA-Z0-9_-]/g,"")
        .toLowerCase();
  }
}
