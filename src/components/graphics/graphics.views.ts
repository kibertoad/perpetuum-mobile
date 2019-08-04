import { validationHelper as validate } from 'validation-utils'
import * as PIXI from 'pixi.js'

export class Views {
  private views: Record<string, PIXI.Container>
  private app: PIXI.Application

  constructor(app: PIXI.Application) {
    this.app = app
    this.views = {}
  }

  public createView(id: string): PIXI.Container {
    validate.nil(this.views[id], `View already exists: ${id}`)
    const container = new PIXI.Container()
    this.views[id] = container
    this.app.stage.addChild(container)
    return container
  }

  public getView(id: string): PIXI.Container {
    const view = this.views[id]
    validate.notNil(view, `Unknown view: ${id}`)
    return view
  }
}
