import { Audio, AudioConfig } from './components/audio/audio.component'
import { Graphics, GraphicsConfig } from './components/graphics/graphics.component'
import { DeepPartial } from './types/core-types'
import { Input, InputConfig } from './components/input/input.component'
import { Entities, EntitiesConfig } from './components/entities/entity.component'

export type GameConfig = {
  audio?: AudioConfig
  graphics?: GraphicsConfig
  input?: InputConfig
  entities?: EntitiesConfig
}

export class Game {
  public audio: Audio
  public graphics: Graphics
  public input: Input
  public entities: Entities

  constructor(config: DeepPartial<GameConfig>) {
    this.audio = new Audio(config.audio)
    this.graphics = new Graphics(config.graphics)
    this.input = new Input(config.input)
    this.entities = new Entities(this, config.entities)
  }
}
