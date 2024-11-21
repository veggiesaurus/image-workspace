import { observable } from "mobx";
import { BaseModel, BaseModelRto } from "./baseModel.ts";
import { OrderableItem } from "image-workspace-shared";


export interface OrderableModelRto extends BaseModelRto, OrderableItem {
}

export class OrderableModel extends BaseModel {
  @observable accessor orderValue: number;

  constructor(dto: OrderableModelRto) {
    super(dto);
    this.orderValue = dto.orderValue;
  }
}
