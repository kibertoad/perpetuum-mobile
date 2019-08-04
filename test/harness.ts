import { Game } from '../'
import './types/window-types'

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
  window.game.graphics.factory.createSpriteFromSpritesheet('bird', mainView, {
    x: 10,
    y: 10
  })
})
