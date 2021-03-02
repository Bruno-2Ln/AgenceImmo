export interface Property {
    title: string;
    category: string;
    surface: number;
    rooms: number;
    description?: string;
    price: number;
    sold: boolean;
    photos?: any[];
    bedrooms?: number;
    bathrooms?: number;
    postal_code?: number;
    city?: string;
    reference?: number;
    heart_stroke?: boolean;
    indexSearch?: string
}
