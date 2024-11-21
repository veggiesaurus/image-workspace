import { maxInRange, minMaxArray } from "./math";

export const ORDER_INDEX_START = 0;
export const ORDER_INDEX_INCREMENT = 1;

// Offset and range when generating a new order index from a lower and upper bound.
// For naive deterministic approach, offset would be 0.5 and range would be 0.0 (i.e midpoint between lower and upper bounds)
const ORDER_INDEX_RANDOM_OFFSET = 0.5;
const ORDER_INDEX_RANDOM_RANGE = 0.0;

export interface OrderableItem {
  id: string;
  orderValue: number;
}

export function getNextOrderValue<T extends OrderableItem>(items: T[]): number {
  if (!items?.length) {
    return ORDER_INDEX_START;
  }

  return items.reduce((max, item) => Math.max(max, item.orderValue), ORDER_INDEX_START) + ORDER_INDEX_INCREMENT;
}

export function sortByOrderValue<T extends OrderableItem>(items: T[]): T[] {
  return items.slice().sort((a, b) => a.orderValue - b.orderValue);
}

export function calculateNewOrderValue<T extends OrderableItem>(items: T[], target?: T | number | string): number {
  // If target is undefined, we are adding to the end of the list
  if (target === undefined) {
    return getNextOrderValue(items);
  }

  let targetIndex;
  if (typeof target === "number") {
    targetIndex = target;
  } else if (typeof target === "string") {
    targetIndex = items.findIndex(item => item.id === target);
  } else {
    targetIndex = items.indexOf(target);
  }

  if (targetIndex === -1) {
    return NaN;
  }

  const indices = items.map((item) => item.orderValue);
  const { minVal, maxVal } = minMaxArray(indices);

  if (targetIndex <= 0) {
    return minVal - ORDER_INDEX_INCREMENT;
  } else if (targetIndex >= items.length) {
    return maxVal + ORDER_INDEX_INCREMENT;
  }

  const upperBound = indices[targetIndex];
  const lowerBound = maxInRange(indices, upperBound);

  const range = upperBound - lowerBound;
  // console.log(range);
  const offset = range * ORDER_INDEX_RANDOM_OFFSET;
  const random = Math.random() * range * ORDER_INDEX_RANDOM_RANGE;
  return lowerBound + offset + random;
}

