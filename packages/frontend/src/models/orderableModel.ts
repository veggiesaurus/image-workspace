import { observable } from "mobx";
import { BaseModel, BaseModelRto } from "./baseModel.ts";

export interface OrderableModelRto extends BaseModelRto {
  orderIndex: number;
}

export class OrderableModel extends BaseModel {
  @observable accessor orderIndex: number;

  constructor(dto: OrderableModelRto) {
    super(dto);
    this.orderIndex = dto.orderIndex;
  }
}