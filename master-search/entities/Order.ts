import { MasterSearchResult } from './MasterSearchResult';

export enum Order {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  DURATION_ASC = 'DURATION_ASC',
  DURATION_DESC = 'DURATION_DESC',
}

export const ORDER_LABELS = {
  [Order.PRICE_ASC]: 'Спочатку дешевше',
  [Order.PRICE_DESC]: 'Спочатку дорожче',
  [Order.DURATION_ASC]: 'Спочатку швидше',
  [Order.DURATION_DESC]: 'Спочатку довше',
};

type SearchResultComparator = (
  res1: MasterSearchResult,
  res2: MasterSearchResult,
) => number;

export const ORDER_COMP_FUNCTIONS: Record<Order, SearchResultComparator> = {
  [Order.PRICE_ASC]: (res1, res2) => res1.price - res2.price,
  [Order.PRICE_DESC]: (res1, res2) => res2.price - res1.price,
  [Order.DURATION_ASC]: (res1, res2) => res1.duration - res2.duration,
  [Order.DURATION_DESC]: (res1, res2) => res2.duration - res1.duration,
};
