import { expect, test, describe, beforeEach } from "bun:test";
import { v7 as uuidv7 } from "uuid";
import { OrderableItem } from "../models/orderableModel.ts";
import { getNextOrderIndex, ORDER_INDEX_INCREMENT, ORDER_INDEX_START, sortByOrderIndex } from "../util/ordering.ts";


describe("orderIndex utilities", () => {
  let items: OrderableItem[];
  beforeEach(() => {
    items = new Array(10).fill(0).map((_, i) => ({ id: uuidv7(), orderIndex: ORDER_INDEX_START + i * ORDER_INDEX_INCREMENT }));

  });

  describe("getNextOrderIndex", () => {
    test("getNextOrderIndex works correctly for existing items", () => {
      expect(items[0].orderIndex).toBe(ORDER_INDEX_START);
      const lastIndex = items[items.length - 1].orderIndex;
      expect(getNextOrderIndex(items)).toBeCloseTo(lastIndex + ORDER_INDEX_INCREMENT, 8);
    });

    test("getNextOrderIndex works correctly for empty items", () => {
      expect(getNextOrderIndex([])).toBe(ORDER_INDEX_START);
    });

    test("getNextOrderIndex works correctly for null items", () => {
      // @ts-expect-error null is not assignable to OrderableItem[]
      expect(getNextOrderIndex(null)).toBe(ORDER_INDEX_START);
      // @ts-expect-error undefined is not assignable to OrderableItem[]
      expect(getNextOrderIndex(undefined)).toBe(ORDER_INDEX_START);
    });
  });

  describe("sortByOrderIndex", () => {
    test("sortByOrderIndex works with positive integers", () => {
      const unsorted: OrderableItem[] = [{ id: "aaaa", orderIndex: 3 }, { id: "bbb", orderIndex: 1 }, { id: "ccc", orderIndex: 2 }];
      const sorted = sortByOrderIndex(unsorted);
      expect(sorted).toHaveLength(unsorted.length);
      expect(sorted[0].id).toBe("bbb");
      expect(sorted[1].id).toBe("ccc");
      expect(sorted[2].id).toBe("aaaa");
    });

    test("sortByOrderIndex works with real numbers", () => {
      const unsorted: OrderableItem[] = [{ id: "aaaa", orderIndex: 4.3 }, { id: "bbb", orderIndex: 1e9 }, { id: "ccc", orderIndex: -0.1111 }];
      const sorted = sortByOrderIndex(unsorted);
      expect(sorted).toHaveLength(unsorted.length);
      expect(sorted[0].id).toBe("ccc");
      expect(sorted[1].id).toBe("aaaa");
      expect(sorted[2].id).toBe("bbb");
    });
  });

  describe("calculateNewOrderIndex", () => {

  });
});
