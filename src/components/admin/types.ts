export interface ProductFormData {
    name: string;
    price: string;
    discountPrice: string;
    description: string;
    details: string[];
    category: string;
    colors: string[];
    sizes: string[];
    isNewProduct: boolean;
    isBestseller: boolean;
    images: string[];
}

export const emptyProductForm: ProductFormData = {
    name: '',
    price: '',
    discountPrice: '',
    description: '',
    details: [],
    category: 'All',
    colors: [],
    sizes: [],
    isNewProduct: false,
    isBestseller: false,
    images: [],
};