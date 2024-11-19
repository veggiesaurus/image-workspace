import { Image } from "./image.ts";
import { observable } from "mobx";
import { ObjectPool } from "./objectPool.ts";
import { OrderableModel, OrderableModelRto } from "./orderableModel.ts";


export interface RegionRto extends OrderableModelRto {
  label: string;
  imageId: string;
}


export class Region extends OrderableModel implements RegionRto {
  @observable accessor label: string;
  readonly imageId: string;

  constructor(dto: RegionRto) {
    super(dto);
    this.label = dto.label;
    this.imageId = dto.imageId;
  }

  get image(): Image | null {
    return ObjectPool.images.get(this.imageId) ?? null;
  }
}
