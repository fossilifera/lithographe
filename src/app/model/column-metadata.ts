export class ColumnMetadata {
  readonly position: number;
  readonly displayName: string;
  readonly jsonName: string;

  constructor(position: number, displayName: string) {
    this.position = position;
    this.displayName = displayName;
    this.jsonName= this.transformToAsciiSafeName(displayName);
  }

  private transformToAsciiSafeName(name: string) : string {
    return name
        .replaceAll(" ", "_")
        .replaceAll(/[^a-zA-Z0-9_-]/g,"")
        .toLowerCase();
  }
}
