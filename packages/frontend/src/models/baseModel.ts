import { computed, observable } from "mobx";
import { User } from "./user.ts";
import { ObjectPool } from "./objectPool.ts";

export interface BaseModelRto {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  createdById: string;
  updatedById?: string;
}

export class BaseModel implements BaseModelRto {
  readonly id!: string;

  readonly createdAt: Date;
  readonly createdById: string;

  @observable updatedAt: Date | undefined;
  @observable updatedById: string | undefined;

  constructor(dto: BaseModelRto) {
    this.id = dto.id;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
    this.createdById = dto.createdById;
    this.updatedById = dto.updatedById;
  }

  get createdBy(): User | null {
    return ObjectPool.users.get(this.createdById) ?? null;
  }

  @computed get updatedBy(): User | null {
    return this.updatedById ? ObjectPool.users.get(this.updatedById) ?? null : null;
  }
}
