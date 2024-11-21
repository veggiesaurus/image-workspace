import { User } from "./user";
import { Workspace } from "./workspace";
import { Image } from "./image";
import { Region } from "./region";
import { observable } from "mobx";

export const ObjectPool = {
  users: observable(new Map<string, User>()),
  workspaces: observable(new Map<string, Workspace>()),
  images: observable(new Map<string, Image>()),
  regions: observable(new Map<string, Region>()),
};

export function getListFromPool<T extends {id :string}>(type: keyof typeof ObjectPool, idField: keyof T, id: string): T[] {
  const itemMap = ObjectPool[type] as unknown as Map<string, T>;

  const items = new Array<T>();
  for (const [, value] of itemMap) {
    if (value[idField] === id) {
      items.push(value as unknown as T);
    }
  }

  return items;
}
