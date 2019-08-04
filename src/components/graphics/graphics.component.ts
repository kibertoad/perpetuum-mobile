import * as PIXI from 'pixi.js'
import { GraphicsLoader } from './graphics.loader'
import { GraphicsFactory } from './graphics.factory'
import { Views } from './graphics.views'

export type GraphicsConfig = {
  canvasWidth: number
  canvasHeight: number
  canvasBackgroundColour: number
  pathToImages: string
}

const DEFAULT_GRAPHICS_CONFIG: GraphicsConfig = Object.freeze({
  canvasWidth: 800,
  canvasHeight: 600,
  canvasBackgroundColour: 0x1099bb,
  pathToImages: 'assets/images'
})

export class Graphics {
  public loader: GraphicsLoader
  public views: Views
  public factory: GraphicsFactory

  private app: PIXI.Application
  private config: GraphicsConfig

  constructor(config?: Partial<GraphicsConfig>) {
    this.config = Object.assign({}, DEFAULT_GRAPHICS_CONFIG, config || {})
    this.app = new PIXI.Application({
      width: this.config.canvasWidth,
      height: this.config.canvasHeight,
      backgroundColor: this.config.canvasBackgroundColour
    })

    this.loader = new GraphicsLoader(this.app, this.config)
    this.factory = new GraphicsFactory(this.app, this.config)
    this.views = new Views(this.app)
  }

  init() {
    document.body.appendChild(this.app.view)
  }
}
