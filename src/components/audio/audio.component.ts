import { validationHelper as validate } from 'validation-utils'
import { Howl, Howler } from 'howler'
import path from 'path'

export type AudioConfig = {
  pathToSounds: string
}

const DEFAULT_AUDIO_CONFIG: AudioConfig = Object.freeze({
  pathToSounds: 'assets/sounds'
})

export class Audio {
  private sounds: Record<string, Howl> = {}
  private config: AudioConfig

  public constructor(config?: Partial<AudioConfig>) {
    this.config = Object.assign({}, DEFAULT_AUDIO_CONFIG, config || {})
  }

  public loadSound(pathToFile: string, soundId: string) {
    validate.nil(this.sounds[soundId], `Sound ${soundId} is already defined.`)
    const resolvedPath = path.resolve(this.config.pathToSounds, pathToFile)

    const sound = new Howl({
      src: [resolvedPath],
      onloaderror: ((id, error) => {
        console.error(`Error while loading sound from ${resolvedPath}: ${error}`)
      })
    })
    this.sounds[soundId] = sound
  }

  public playSound(soundId: string) {
    const sound = this.sounds[soundId]
    sound.play()
  }
}

