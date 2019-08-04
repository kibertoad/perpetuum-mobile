import { Game } from '../'
import './types/window-types'

window.game = new Game({
  audio: {
    pathToSounds: 'assets/sounds'
  }
})

window.game.audio.loadSound('wilhelm_scream.wav', 'scream')
window.game.audio.playSound('scream')
