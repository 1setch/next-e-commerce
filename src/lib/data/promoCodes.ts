// lib/data/promoCodes.ts

export interface PromoCode {
  code: string;
  discount: number; // в рубасах
  description: string;
}

export const promoCodes: PromoCode[] = [
  { code: 'WELCOME20', discount: 20, description: '$20 off your first order' },
  { code: 'FREESHIP', discount: 15, description: 'Free standard delivery' },
  { code: 'SALE10', discount: 10, description: '$10 off any order' },
];

export function validatePromo(code: string): PromoCode | null {
  return promoCodes.find((p) => p.code.toUpperCase() === code.toUpperCase()) || null;
}