import { observable } from "mobx";
import { BaseModel, BaseModelRto } from "./baseModel.ts";

export interface OrderableItem {
  id: string;
  orderIndex: number;
}

export interface OrderableModelRto extends BaseModelRto, OrderableItem {
}

export class OrderableModel extends BaseModel {
  @observable accessor orderIndex: number;

  constructor(dto: OrderableModelRto) {
    super(dto);
    this.orderIndex = dto.orderIndex;
  }
}
