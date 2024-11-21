import { run, bench } from "mitata";
import { v7 as uuidv7 } from "uuid";
import { calculateNewOrderValue, ORDER_INDEX_INCREMENT } from "../util/ordering.ts";


const items = new Array(100).fill(0).map(() => ({ id: uuidv7(), orderValue: ORDER_INDEX_INCREMENT * 10 * Math.random() }));

bench("calculateNewOrderValue", () => {
  // Choose a random index to insert at
  const targetIndex = Math.floor(Math.random() * items.length);
  const newIndex = calculateNewOrderValue(items, targetIndex);
});

await run();
