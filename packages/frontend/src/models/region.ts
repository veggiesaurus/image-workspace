import { Image } from "./image";
import { observable } from "mobx";
import { ObjectPool } from "./objectPool";
import { OrderableModel } from "./orderableModel";
import { v7 as uuidv7 } from "uuid";
import { User } from "./user";
import { getNextOrderValue } from "shared-lib/util";
import { Point2d, RegionType } from "shared-lib/types";
import { RegionRto } from "shared-lib/rto";


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

  static CreateRectRegion(image: Image, user: User, point: Point2d, width: number, height: number) {
    return new Region({
      id: uuidv7(),
      label: "new rectangle region",
      createdAt: new Date(),
      createdById: user.id,
      orderValue: getNextOrderValue(image.regions),
      imageId: image.id,
      regionType: RegionType.RECTANGLE,
      controlPoints: [point, { x: width, y: height }],
    });
  }

  get image(): Image | null {
    return ObjectPool.images.get(this.imageId) ?? null;
  }
}
