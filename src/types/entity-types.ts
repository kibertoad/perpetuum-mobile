import { GenericEntityDefinition } from '../components/entities/entity.component'

export type EntityPosition = {
  x: number
  y: number
}

export interface PositionHolder {
  move(deltaX: number, deltaY: number)
  getPosition(): EntityPosition
}

export interface DefinitionHolder {
  definition: GenericEntityDefinition
}
