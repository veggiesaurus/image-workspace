import { pgEnum, timestamp } from "drizzle-orm/pg-core";

export const timestampz = () => timestamp({ withTimezone: true });

export const timestamps = {
  updatedAt: timestampz(),
  createdAt: timestampz().defaultNow().notNull(),
  deletedAt: timestampz(),
};

export enum RegionType {
  POINT = "point",
  RECTANGLE = "rectangle",
  ELLIPSE = "ellipse",
  POLYGON = "polygon",
}

export function enumToPgEnum<T extends Record<string, any>>(myEnum: T): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}
