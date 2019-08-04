import { Game } from '../../'
import './types/window-types'
const game = new Game({})

function loadAssets() {
  game.audio.loadSound('wilhelm_scream.wav', 'scream')
  game.audio.playSound('scream')
}

window.game = game

loadAssets()
