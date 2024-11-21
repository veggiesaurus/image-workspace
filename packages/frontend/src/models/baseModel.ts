import { computed, observable } from "mobx";
import { User } from "./user";
import { ObjectPool } from "./objectPool";
import { BaseRto } from "shared-lib/rto";

export class BaseModel implements BaseRto {
  readonly id!: string;

  readonly createdAt: Date;
  readonly createdById: string;

  @observable updatedAt: Date | undefined;
  @observable updatedById: string | undefined;

  constructor(dto: BaseRto) {
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
