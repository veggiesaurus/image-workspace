import { action, computed, observable } from "mobx";
import { getListFromPool, ObjectPool } from "./objectPool";
import { Region } from "./region";
import { OrderableModel } from "./orderableModel";
import { ImageRto } from "shared-lib/rto/index";


export class Image extends OrderableModel implements ImageRto {
  @observable accessor label: string;
  @observable accessor spatialReferenceId: string | undefined;
  @observable accessor orderValue: number;

  constructor(dto: ImageRto) {
    super(dto);
    this.label = dto.label;
    this.spatialReferenceId = dto.spatialReferenceId;
    this.orderValue = dto.orderValue;
  }

  // Updates the spatial reference to a given image or image ID
  @action setSpatialReference(spatialReference: Image | string) {
    let newReference: string;
    if (typeof spatialReference === "string") {
      newReference = spatialReference;
    } else if (spatialReference?.id) {
      newReference = spatialReference.id;
    } else {
      console.warn("Invalid spatial reference supplied");
      return false;
    }

    let referenceImage = ObjectPool.images.get(newReference);
    if (!referenceImage) {
      console.warn("Invalid spatial reference supplied");
      return false;
    }

    // This checks for simple circular references by traversing up the spatial reference chain until we find one without a spatial reference
    while (referenceImage.spatialReference) {
      if (referenceImage.spatialReferenceId === this.id) {
        console.warn("Cannot create a circular reference");
        return false;
      }
      referenceImage = referenceImage.spatialReference;
    }

    this.spatialReferenceId = newReference;
    return true;
  }

  @action clearSpatialReference() {
    this.spatialReferenceId = undefined;
  }

  @computed get spatialReference(): Image | null {
    return this.spatialReferenceId ? ObjectPool.images.get(this.spatialReferenceId) ?? null : null;
  }

  @computed get regions() {
    return getListFromPool<Region>("regions", "imageId", this.id).sort((a, b) => a.orderValue - b.orderValue);
  }
}
