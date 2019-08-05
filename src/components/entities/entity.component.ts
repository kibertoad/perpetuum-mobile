import { Game } from '../../game'
import { Graphics } from '../graphics/graphics.component'
import { EntityPosition } from '../../types/entity-types'
import { DeepPartial } from '../../types/core-types'
import { EntityRepository } from './entity.repository'
import { GenericPositionEntity } from '../../models/GenericPositionEntity'

export const MAIN_SPRITE = 'main'

export interface GenericEntityDefinition {
  id: string
  name: string
  sprites: Record<string, string>
}

export type EntitiesConfig = {
  entitiesDefinitions: Record<string, GenericEntityDefinition>
}

const DEFAULT_ENTITIES_CONFIG: EntitiesConfig = Object.freeze({
  entitiesDefinitions: {}
})

export class Entities {
  private entityDefinitions: Record<string, GenericEntityDefinition>

  private graphics: Graphics
  private repository: EntityRepository

  public constructor(
    game: Game,
    config?: DeepPartial<EntitiesConfig>
  ) {
    const resolvedConfig = Object.assign({}, DEFAULT_ENTITIES_CONFIG, config)
    this.entityDefinitions = resolvedConfig.entitiesDefinitions

    this.graphics = game.graphics
    this.repository = new EntityRepository()
  }

  public spawn(view: PIXI.Container, id: string, position: EntityPosition) {
    const entityDefinition = this.entityDefinitions[id]
    const entityInstance = new GenericPositionEntity(entityDefinition, position)

    this.repository.add(entityInstance)
    const entityView = this.graphics.factory.createSpriteFromSpritesheet(entityInstance, view, position)

    return {
      model: entityInstance,
      view: entityView
    }
  }

}
