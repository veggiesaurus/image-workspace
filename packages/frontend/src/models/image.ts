import { computed, observable } from "mobx";
import { getListFromPool, ObjectPool } from "./objectPool.ts";
import { Region } from "./region.ts";
import { OrderableModel, OrderableModelRto } from "./orderableModel.ts";

export interface ImageRto extends OrderableModelRto {
  label: string;
  spatialReferenceId?: string;
}


export class Image extends OrderableModel implements ImageRto {
  @observable accessor label: string;
  @observable accessor spatialReferenceId: string | undefined;
  @observable accessor orderIndex: number;

  constructor(dto: ImageRto) {
    super(dto);
    this.label = dto.label;
    this.spatialReferenceId = dto.spatialReferenceId;
    this.orderIndex = dto.orderIndex;
  }

  @computed get spatialReference(): Image | null {
    return this.spatialReferenceId ? ObjectPool.images.get(this.spatialReferenceId) ?? null : null;
  }

  @computed get regions() {
    return getListFromPool<Region>("regions", "imageId", this.id).sort((a, b) => a.orderIndex - b.orderIndex);
  }
}