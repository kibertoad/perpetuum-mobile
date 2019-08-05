import { GenericPositionEntity } from './GenericPositionEntity'
import { EntityPosition } from '../types/entity-types'

export class GenericViewEntity<T extends GenericPositionEntity> {

  private sprite: PIXI.Sprite
  private entity: T

  public constructor(entity: T, sprite: PIXI.Sprite) {
    this.sprite = sprite
    this.entity = entity

    entity.getPositionObservable().subscribe((position) => {
      console.log('recalc screen position: '+JSON.stringify(position))
      this.updateScreenPosition(position)
    })
  }

  private updateScreenPosition(modelPosition: EntityPosition) {
    this.sprite.x = modelPosition.x
    this.sprite.y = modelPosition.y
  }

}
