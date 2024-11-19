import { computed, observable } from "mobx";
import { getListFromPool } from "./objectPool.ts";
import { Image } from "./image.ts";
import { Workspace } from "./workspace.ts";

export interface UserDto {
  id: string;
  name: string;
  email?: string;
}


export class User implements UserDto {
  readonly id: string;
  @observable accessor name = "";
  @observable accessor email: string | undefined;

  constructor(dto: UserDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
  }

  @computed get createdImages() {
    return getListFromPool<Image>("images", "createdById", this.id);
  }

  @computed get updatedImages() {
    return getListFromPool<Image>("images", "updatedById", this.id);
  }

  @computed get createdWorkspaces() {
    return getListFromPool<Workspace>("workspaces", "createdById", this.id);
  }

  @computed get updatedWorkspaces() {
    return getListFromPool<Workspace>("workspaces", "updatedById", this.id);
  }
}