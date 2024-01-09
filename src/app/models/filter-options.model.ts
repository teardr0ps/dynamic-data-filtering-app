export interface FilterOptionsResponse {
  [key: string]: FilterOption[] | number;
  brand: FilterOption[];
  size: FilterOption[];
  color: FilterOption[];
  material: FilterOption[];
  lowest_price_range: number;
  max_price_range: number;
}

export interface FilterOption {
  name: string;
  value: string;
}

export interface FilterFormField {
  name: string;
  value: string;
  label: string;
  options: FilterOption[];
  // Add more specific properties here if needed
}

export interface PriceRangesOptions {
  lowest_price_range: number;
  max_price_range: number;
}
