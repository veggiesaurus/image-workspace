import { observable } from "mobx";
import { BaseModel } from "./baseModel";
import { OrderableRto } from "shared-lib/rto";


export class OrderableModel extends BaseModel {
  @observable accessor orderValue: number;

  constructor(dto: OrderableRto) {
    super(dto);
    this.orderValue = dto.orderValue;
  }
}
