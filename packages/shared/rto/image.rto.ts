import { OrderableRto } from "./orderable.rto";

export interface ImageRto extends OrderableRto {
  label: string;
  spatialReferenceId?: string;
}
