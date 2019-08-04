import { Audio, AudioConfig } from './components/audio/audio.component'

export type GameConfig = {
  audio?: AudioConfig
}

export class Game {
  public audio: Audio

  constructor(config: GameConfig) {
    this.audio = new Audio(config.audio)
  }
}
