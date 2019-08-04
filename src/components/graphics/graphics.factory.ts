import * as PIXI from 'pixi.js'
import { GraphicsConfig } from './graphics.component'
import { EntityPosition } from '../../types/core-types'

export class GraphicsFactory {
  private app: PIXI.Application
  private resources: Record<string, PIXI.LoaderResource>

  constructor(app: PIXI.Application, config: GraphicsConfig) {
    this.app = app
    this.resources = this.app.loader.resources
  }

  public createSpriteFromSpritesheet(id: string, view: PIXI.Container, position: EntityPosition) {
    const spritesheet: PIXI.LoaderResource = this.resources.spritesheet
    // @ts-ignore
    const image = spritesheet.textures[id]
    const spriteInstance = new PIXI.Sprite(image)
    spriteInstance.x = position.x
    spriteInstance.y = position.y

    view.addChild(spriteInstance)
  }

  public createSprite(id: string, view: PIXI.Container, position: EntityPosition) {
    const image = this.resources[id]
    const spriteInstance = new PIXI.Sprite(image.texture)
    spriteInstance.x = position.x
    spriteInstance.y = position.y

    view.addChild(spriteInstance)
  }
}
