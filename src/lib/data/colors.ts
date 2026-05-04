// lib/data/colors.ts

export interface ProductColor {
  name: string;
  hex: string;
}

export const allColors: ProductColor[] = [
  { name: 'Чёрный', hex: '#000000' },
  { name: 'Белый', hex: '#FFFFFF' },
  { name: 'Серый', hex: '#808080' },
  { name: 'Серый меланж', hex: '#a9a9a9' },
  { name: 'Бежевый', hex: '#d4c4a8' },
  { name: 'Кремовый', hex: '#f5f5dc' },
  { name: 'Молочный', hex: '#e9f5f5' },
  { name: 'Коричневый', hex: '#8b4513' },
  { name: 'Красный', hex: '#C41E3A' },
  { name: 'Розовый', hex: '#ffb6c1' },
  { name: 'Голубой', hex: '#add8e6' },
  { name: 'Хаки', hex: '#556B2F' },
];