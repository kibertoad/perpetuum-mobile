import * as PIXI from 'pixi.js'
import { GraphicsConfig } from './graphics.component'
import path from 'path'
import XHR_RESPONSE_TYPE = PIXI.LoaderResource.XHR_RESPONSE_TYPE

export class GraphicsLoader {
  private config: GraphicsConfig
  private app: PIXI.Application

  constructor(app: PIXI.Application, config: GraphicsConfig) {
    this.app = app
    this.config = config
  }

  loadSpritesheet(pathToFile: string, cb: Function) {
    const resolvedPath = path.resolve(this.config.pathToImages, pathToFile)
    this.app.loader
      .add('spritesheet', resolvedPath, {
        xhrType: XHR_RESPONSE_TYPE.JSON
      })
      .load(cb)
  }

  loadAsset(pathToFile: string, id: string) {
    const resolvedPath = path.resolve(this.config.pathToImages, pathToFile)
    this.app.loader.add(id, pathToFile).load((loader, resources) => {
      console.log(`Asset loaded: ${resolvedPath}`)
    })
  }
}
