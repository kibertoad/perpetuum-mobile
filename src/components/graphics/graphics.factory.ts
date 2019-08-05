import * as PIXI from 'pixi.js'
import { GraphicsConfig } from './graphics.component'
import { EntityPosition } from '../../types/entity-types'
import { SpriteRepository } from './sprite.repository'
import { GenericViewEntity } from '../../models/GenericViewEntity'
import { GenericPositionEntity } from '../../models/GenericPositionEntity'
import { MAIN_SPRITE } from '../entities/entity.component'

export class GraphicsFactory {
  private app: PIXI.Application
  private resources: Record<string, PIXI.LoaderResource>
  private repository: SpriteRepository

  constructor(app: PIXI.Application, config: GraphicsConfig) {
    this.app = app
    this.resources = this.app.loader.resources
    this.repository = new SpriteRepository()
  }

  public createSpriteFromSpritesheet(model: GenericPositionEntity, view: PIXI.Container, position: EntityPosition): GenericViewEntity<GenericPositionEntity> {
    const spritesheet: PIXI.LoaderResource = this.resources.spritesheet
    // @ts-ignore
    const image = spritesheet.textures[model.definition.sprites[MAIN_SPRITE]]
    const spriteInstance = new PIXI.Sprite(image)

    const viewInstance = new GenericViewEntity(model, spriteInstance)
    view.addChild(spriteInstance)
    this.repository.add(viewInstance)
    return viewInstance
  }

  public createSprite(model: GenericPositionEntity, view: PIXI.Container, position: EntityPosition) {
    const image = this.resources[model.definition.sprites[MAIN_SPRITE]]
    const spriteInstance = new PIXI.Sprite(image.texture)

    const viewInstance = new GenericViewEntity(model, spriteInstance)
    view.addChild(spriteInstance)
    this.repository.add(viewInstance)
  }
}
