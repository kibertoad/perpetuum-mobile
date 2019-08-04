import { EntityPosition, PositionHolder } from '../types/entity-types'

export class GenericPositionEntity implements PositionHolder {
  private position: EntityPosition

  public constructor() {
    this.position = {
      x: 0,
      y: 0
    }
  }

  getPosition(): EntityPosition {
    return this.position;
  }

  move(deltaX: number, deltaY: number) {
    this.position.x += deltaX
    this.position.y += deltaY
  }

}
