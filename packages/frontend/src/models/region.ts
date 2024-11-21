import { Image } from "./image.ts";
import { observable } from "mobx";
import { ObjectPool } from "./objectPool.ts";
import { OrderableModel, OrderableModelRto } from "./orderableModel.ts";
import { Point2d } from "../util/point2d.ts";
import {v7 as uuidv7} from "uuid";
import { User } from "./user.ts";
import { getNextOrderValue } from "../util/ordering.ts";

export enum RegionType {
  POINT = "point",
  RECTANGLE = "rectangle",
  ELLIPSE = "ellipse",
  POLYGON = "polygon",
}


export interface RegionRto extends OrderableModelRto {
  label: string;
  imageId: string;
  regionType: RegionType;
  controlPoints: Point2d[];
}


export class Region extends OrderableModel implements RegionRto {
  @observable accessor label: string;
  readonly imageId: string;
  readonly regionType: RegionType;
  @observable accessor controlPoints: Point2d[];

  constructor(dto: RegionRto) {
    super(dto);
    this.label = dto.label;
    this.imageId = dto.imageId;
    this.regionType = dto.regionType;
    this.controlPoints = dto.controlPoints;
  }

  static CreatePointRegion(image: Image, user: User, point: Point2d) {
    return new Region({
      id: uuidv7(),
      label: "new point region",
      createdAt: new Date(),
      createdById: user.id,
      orderValue: getNextOrderValue(image.regions),
      imageId: image.id,
      regionType: RegionType.POINT,
      controlPoints: [point],
    });
  }

  get image(): Image | null {
    return ObjectPool.images.get(this.imageId) ?? null;
  }
}
