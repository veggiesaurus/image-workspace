import { OrderableRto } from "./orderable.rto";
import { Point2d, RegionType } from "../types";

export interface RegionRto extends OrderableRto {
  label: string;
  imageId: string;
  regionType: RegionType;
  controlPoints: Point2d[];
}
