import { Game } from '../'
import './types/window-types'
import { MAIN_SPRITE } from '../src/components/entities/entity.component'
import { Direction, newJobManager } from '../src/components/input/jobs/DirectMovementJob'

window.game = new Game({
  audio: {
    pathToSounds: 'assets/sounds'
  },
  graphics: {
    pathToImages: 'assets/images'
  },
  entities: {
    entitiesDefinitions: {
      bird: {
        id: 'bird',
        name: 'Le Bird',
        sprites: {
          [MAIN_SPRITE]: 'bird1'
        }
      }
    }
  }
})

//window.game.audio.loadSound('wilhelm_scream.wav', 'scream')
//window.game.audio.playSound('scream')

window.game.graphics.init()
window.game.graphics.loader.loadSpritesheet('spritesheet.metadata', () => {
  const mainView = window.game.graphics.views.createView('main')
  const { model, view } = window.game.entities.spawn(mainView, 'bird', {
    x: 10,
    y: 10
  })

  const movementInterval = 3
  const movementDelta = 2
  const leftManager = newJobManager(window.game.input.events, Direction.Left, model, movementDelta, movementInterval)
  const rightManager = newJobManager(window.game.input.events, Direction.Right, model, movementDelta, movementInterval)
  const upManager = newJobManager(window.game.input.events, Direction.Up, model, movementDelta, movementInterval)
  const downManager = newJobManager(window.game.input.events, Direction.Down, model, movementDelta, movementInterval)
})

window.game.input.initKeyboardEvent()

