import { WorkspaceRto } from "shared-lib/rto";
import { BaseModel } from "./baseModel";
import { observable } from "mobx";

export class Workspace extends BaseModel {
  @observable accessor label: string;

  constructor(dto: WorkspaceRto) {
    super(dto);
    this.label = dto.label;
  }
}
