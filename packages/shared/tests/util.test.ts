import { expect, test, describe, beforeEach } from "bun:test";
import { v7 as uuidv7 } from "uuid";
import { calculateNewOrderValue, getNextOrderValue, ORDER_INDEX_INCREMENT, ORDER_INDEX_START, OrderableItem, sortByOrderValue } from "../util";


describe("orderValue", () => {
  describe("getNextOrderValue", () => {
    test("existing items", () => {
      const items = new Array(10).fill(0).map((_, i) => ({ id: uuidv7(), orderValue: ORDER_INDEX_START + i * ORDER_INDEX_INCREMENT }));
      expect(items[0].orderValue).toBe(ORDER_INDEX_START);
      const lastIndex = items[items.length - 1].orderValue;
      expect(getNextOrderValue(items)).toBeCloseTo(lastIndex + ORDER_INDEX_INCREMENT, 8);
    });

    test("empty items", () => {
      expect(getNextOrderValue([])).toBe(ORDER_INDEX_START);
    });

    test("null items", () => {
      // @ts-expect-error null is not assignable to OrderableItem[]
      expect(getNextOrderValue(null)).toBe(ORDER_INDEX_START);
      // @ts-expect-error undefined is not assignable to OrderableItem[]
      expect(getNextOrderValue(undefined)).toBe(ORDER_INDEX_START);
    });
  });

  describe("sortByOrderValue", () => {
    test("positive integers", () => {
      const unsorted: OrderableItem[] = [{ id: "aaaa", orderValue: 3 }, { id: "bbb", orderValue: 1 }, { id: "ccc", orderValue: 2 }];
      const sorted = sortByOrderValue(unsorted);
      expect(sorted).toHaveLength(unsorted.length);
      expect(sorted[0].id).toBe("bbb");
      expect(sorted[1].id).toBe("ccc");
      expect(sorted[2].id).toBe("aaaa");
    });

    test("real numbers", () => {
      const unsorted: OrderableItem[] = [{ id: "aaaa", orderValue: 4.3 }, { id: "bbb", orderValue: 1e9 }, { id: "ccc", orderValue: -0.1111 }];
      const sorted = sortByOrderValue(unsorted);
      expect(sorted).toHaveLength(unsorted.length);
      expect(sorted[0].id).toBe("ccc");
      expect(sorted[1].id).toBe("aaaa");
      expect(sorted[2].id).toBe("bbb");
    });
  });

  describe("calculateNewOrderValue", () => {
    let unsorted: OrderableItem[];

    beforeEach(() => {
      unsorted = new Array(10).fill(0).map(() => ({ id: uuidv7(), orderValue: ORDER_INDEX_INCREMENT * 10 * Math.random() }));
    });
    test("appending to the end of a list", () => {
      const newOrderValue = calculateNewOrderValue(unsorted, undefined);
      const maxIndex = Math.max(...unsorted.map(item => item.orderValue));
      expect(newOrderValue).toBeGreaterThan(maxIndex);
    });

    describe("inserting at the beginning of a list", () => {
      let startItem: OrderableItem;
      let minIndex: number;

      beforeEach(() => {
        startItem = unsorted[0];
        minIndex = Math.max(...unsorted.map((item) => item.orderValue));
      });

      test("by index", () => {
        const newOrderValue = calculateNewOrderValue(unsorted, 0);
        expect(newOrderValue).toBeLessThan(minIndex);
      });

      test("by id", () => {
        const newOrderValue = calculateNewOrderValue(unsorted, startItem.id);
        expect(newOrderValue).toBeLessThan(minIndex);
      });

      test("by item", () => {
        const newOrderValue = calculateNewOrderValue(unsorted, startItem);
        expect(newOrderValue).toBeLessThan(minIndex);
      });
    });

    test("inserting between two random items", () => {
      for (let i = 0; i < 100; i++) {
        // Choose a random index to insert above, but not the first
        const sortedItems = sortByOrderValue(unsorted);
        const targetIndex = Math.floor(Math.random() * (unsorted.length - 1)) + 1;

        const targetItem = sortedItems[targetIndex];
        const targetItemValue = targetItem.orderValue;

        // Find the previous item
        const prevItemValue = sortedItems[targetIndex - 1].orderValue;

        // New index should be between the previous and target item
        const newOrderValue = calculateNewOrderValue(unsorted, targetItem);
        expect(newOrderValue, `new order ${newOrderValue} is not between bounds for targetIndex ${targetIndex}`).toBeLessThan(targetItemValue);
        expect(newOrderValue, `new order ${newOrderValue} is not between bounds for targetIndex ${targetIndex}`).toBeGreaterThan(prevItemValue);
      }
    });
  });
});
