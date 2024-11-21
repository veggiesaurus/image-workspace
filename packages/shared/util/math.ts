import type { OrderableItem } from "./ordering.ts";

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export type NumericArray = Array<number> | TypedArray;

export function minMaxArray(data: NumericArray): { minVal: number; maxVal: number } {
  if (data && data.length) {
    let maxVal = -Number.MAX_VALUE;
    let minVal = Number.MAX_VALUE;

    for (let i = data.length - 1; i >= 0; i--) {
      const val = data[i];
      if (isNaN(val)) {
        continue;
      }
      if (val > maxVal) {
        maxVal = val;
      }
      if (val < minVal) {
        minVal = val;
      }
    }

    if (maxVal !== -Number.MAX_VALUE && minVal !== Number.MAX_VALUE) {
      return { maxVal, minVal };
    }
  }
  return { minVal: NaN, maxVal: NaN };
}

export function minMaxItemArray<T extends OrderableItem>(data: Array<T>): { minVal: T | undefined; maxVal: T | undefined } {
  if (data && data.length) {
    let maxVal = -Number.MAX_VALUE;
    let minVal = Number.MAX_VALUE;
    let minIndex = 0;
    let maxIndex = 0;

    for (let i = data.length - 1; i >= 0; i--) {
      const val = data[i].orderValue;
      if (isNaN(val)) {
        continue;
      }
      if (val > maxVal) {
        maxVal = val;
        maxIndex = i;
      }
      if (val < minVal) {
        minVal = val;
        minIndex = i;
      }
    }

    if (maxVal !== -Number.MAX_VALUE && minVal !== Number.MAX_VALUE) {
      return { minVal: data[minIndex], maxVal: data[maxIndex] };
    }
  }
  return { minVal: undefined, maxVal: undefined };
}


// Finds the highest value in the array that is less than the cutoff
export function maxInRange(values: NumericArray, cutoff: number) {
  let maxVal = -Number.MAX_VALUE;

  for (const val of values) {
    if (val < cutoff && val > maxVal) {
      maxVal = val;
    }
  }
  return maxVal;
}

// Finds the lowest value in the array that is greater than the cutoff
export function minInRange(values: NumericArray, cutoff: number) {
  let minVal = Number.MAX_VALUE;

  for (const val of values) {
    if (val > cutoff && val < minVal) {
      minVal = val;
    }
  }
  return minVal;
}
