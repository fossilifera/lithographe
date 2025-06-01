export interface InventoryPreview {
  columns: string[];
  data: Record<string, string>[];
  isLoaded: boolean;
  isError?: boolean;
}
