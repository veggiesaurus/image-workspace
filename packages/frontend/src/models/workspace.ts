import { BaseModel, BaseModelRto } from "./baseModel.ts";
import { observable } from "mobx";

export interface WorkspaceRto extends BaseModelRto {
  label: string;
}

export class Workspace extends BaseModel {
  @observable accessor label: string;

  constructor(dto: WorkspaceRto) {
    super(dto);
    this.label = dto.label;
  }
}