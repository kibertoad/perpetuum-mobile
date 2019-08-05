import { DefinitionHolder, EntityPosition, PositionHolder } from '../types/entity-types'
import { GenericEntityDefinition } from '../components/entities/entity.component'
import { Observable } from '../core/events/Observable'
import uuid from 'uuid'

export class GenericPositionEntity implements PositionHolder, DefinitionHolder {
  public definition: GenericEntityDefinition

  private uuid: string
  private position: EntityPosition
  private positionUpdated: Observable<EntityPosition>

  public constructor(definition: GenericEntityDefinition, position: EntityPosition = { x: 0, y: 0 }) {
    this.uuid = uuid()
    this.definition = Object.assign({}, definition)
    this.position = {
      x: position.x,
      y: position.y
    }
    this.positionUpdated = new Observable<EntityPosition>()
  }

  getPosition(): EntityPosition {
    return this.position
  }

  getPositionObservable(): Observable<EntityPosition> {
    return this.positionUpdated
  }

  move(deltaX: number, deltaY: number) {
    this.position.x += deltaX
    this.position.y += deltaY
    this.positionUpdated.publishUpdate(this.position)
  }

}
