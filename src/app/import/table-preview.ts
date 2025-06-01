export interface TablePreview {
  columns: string[];
  data: Record<string, string>[];
  isLoaded: boolean;
  isError?: boolean;
}
