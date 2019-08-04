import { Game } from '../'
import './types/window-types'
import { Direction, newJobManager } from './app/input/MovementJob'
import { Bird } from './app/models/bird'

window.game = new Game({
  audio: {
    pathToSounds: 'assets/sounds'
  },
  graphics: {
    pathToImages: 'assets/images'
  }
})

//window.game.audio.loadSound('wilhelm_scream.wav', 'scream')
//window.game.audio.playSound('scream')

window.game.graphics.init()
window.game.graphics.loader.loadSpritesheet('spritesheet.metadata', () => {
  const mainView = window.game.graphics.views.createView('main')
  window.game.graphics.factory.createSpriteFromSpritesheet('bird1', mainView, {
    x: 10,
    y: 10
  })
})

window.game.input.initKeyboardEvent()

const bird = new Bird()

const leftManager = newJobManager(window.game.input.events, Direction.Left, bird)
const rightManager = newJobManager(window.game.input.events, Direction.Right, bird)
const upManager = newJobManager(window.game.input.events, Direction.Up, bird)
const downManager = newJobManager(window.game.input.events, Direction.Down, bird)
