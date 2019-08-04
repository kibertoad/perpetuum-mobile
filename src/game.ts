import { Audio, AudioConfig } from './components/audio/audio.component'
import { Graphics, GraphicsConfig } from './components/graphics/graphics.component'
import { DeepPartial } from './types/core-types'

export type GameConfig = {
  audio?: AudioConfig
  graphics?: GraphicsConfig
}

export class Game {
  public audio: Audio
  public graphics: Graphics

  constructor(config: DeepPartial<GameConfig>) {
    this.audio = new Audio(config.audio)
    this.graphics = new Graphics(config.graphics)
  }
}
