import { OrderableItem } from "../models/orderableModel.ts";

export const ORDER_INDEX_START = 1e9;
export const ORDER_INDEX_INCREMENT = 1e9;

// Offset and range when generating a new order index from a lower and upper bound.
// For naive deterministic approach, offset would be 0.5 and range would be 0.0 (i.e midpoint between lower and upper bounds)
const ORDER_INDEX_RANDOM_OFFSET = 0.3333;
const ORDER_INDEX_RANDOM_RANGE = 0.3333;

export function getNextOrderIndex<T extends OrderableItem>(items: T[]): number {
  if (!items?.length) {
    return ORDER_INDEX_START;
  }

  return items.reduce((max, item) => Math.max(max, item.orderIndex), ORDER_INDEX_START) + ORDER_INDEX_INCREMENT;
}

export function sortByOrderIndex<T extends OrderableItem>(items: T[]): T[] {
  return items.slice().sort((a, b) => a.orderIndex - b.orderIndex);
}

export function calculateNewOrderIndex<T extends OrderableItem>(items: T[], target: T | number | string): number {
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

  const existingIndices = items.map((item) => item.orderIndex);
  const minIndex = Math.min(...existingIndices);
  const maxIndex = Math.max(...existingIndices);

  if (targetIndex < 0) {
    return minIndex - ORDER_INDEX_INCREMENT;
  } else if (targetIndex >= items.length) {
    return maxIndex + ORDER_INDEX_INCREMENT;
  }

  const lowerBound = existingIndices[targetIndex];
  // We only need to sort if we are moving, this saves a bit of time when adding new items or other edge cases
  existingIndices.sort((a, b) => a - b);
  const lowerIndex = existingIndices.indexOf(lowerBound);
  const upperBound = existingIndices[lowerIndex + 1];
  const range = upperBound - lowerBound;
  const offset = range * ORDER_INDEX_RANDOM_OFFSET;
  const random = Math.random() * range * ORDER_INDEX_RANDOM_RANGE;
  return lowerBound + offset + random;
}

