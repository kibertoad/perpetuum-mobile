import { KEY_CODES } from './key.constants'
import { DeepPartial } from '../../types/core-types'
import { InputEvents } from './input.events'
import { ActionStatusHolder } from '../../core/events/Events'

export enum DEFAULT_ACTIONS {
  Help = 'help',
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

export enum ACTION_STATUS {
  Start = 'start',
  End = 'end'
}

export type InputConfig = {
  keyBindings: Record<string, string>
}

const DEFAULT_INPUT_CONFIG: InputConfig = Object.freeze({
  keyBindings: {
    [KEY_CODES.F1]: DEFAULT_ACTIONS.Help,
    [KEY_CODES.UP]: DEFAULT_ACTIONS.Up,
    [KEY_CODES.DOWN]: DEFAULT_ACTIONS.Down,
    [KEY_CODES.LEFT]: DEFAULT_ACTIONS.Left,
    [KEY_CODES.RIGHT]: DEFAULT_ACTIONS.Right
  }
})

export class Input {

  public events: InputEvents

  private isMobile: boolean
  private keyBoardEventTarget: any

  // corresponding actions
  private keyStatus: Record<string, number> = {}

  // lock enable flag for keys
  private keyLock: Record<string, boolean> = {}
  // actual lock status of each key
  private keyLocked: Record<string, boolean> = {}

  // List of binded keys being held
  private keyRefs = {}

  private preventDefault: boolean

  // whether default event should be prevented for a given keypress
  private preventDefaultForKeys: Record<string, boolean> = {}

  // list of binded keys
  private keyBindings: Record<string, string> = {}

  public constructor(config?: DeepPartial<InputConfig>) {
    const resolvedConfig = Object.assign({}, DEFAULT_INPUT_CONFIG, config)

    this.events = new InputEvents()

    this.preventDefault = false
    this.isMobile = false

    Object.entries(resolvedConfig.keyBindings).forEach(([val1, val2]) => {
      this.bindKey(val1, val2, false)
    })
  }

  keyDownEvent(e, keyCode, mouseButton) {
    keyCode = keyCode || e.keyCode || e.button
    const action = this.keyBindings[keyCode]

    // TODO publish a message for keydown event
    console.log('keydown: ' + action)
    this.events.publish(action, {
      actionStatus: ACTION_STATUS.Start
    } as ActionStatusHolder)

    if (action) {
      if (!this.keyLocked[action]) {
        const trigger = (typeof mouseButton !== 'undefined') ? mouseButton : keyCode
        if (!this.keyRefs[action][trigger]) {
          this.keyStatus[action]++
          this.keyRefs[action][trigger] = true
        }
      }
      // prevent event propagation
      if (this.preventDefaultForKeys[keyCode] && (typeof e.preventDefault === 'function')) {
        // "fake" events generated through triggerKeyEvent do not have a preventDefault fn
        return e.preventDefault()
      } else {
        return true
      }
    }

    return true
  };

  keyUpEvent(e, keyCode, mouseButton) {
    keyCode = keyCode || e.keyCode || e.button
    const action = this.keyBindings[keyCode]

    // TODO publish a message for keydown event
    console.log('keyup: ' + action)
    this.events.publish(action, {
      actionStatus: ACTION_STATUS.End
    } as ActionStatusHolder)

    if (action) {
      const trigger = (typeof mouseButton !== 'undefined') ? mouseButton : keyCode
      this.keyRefs[action][trigger] = undefined

      if (this.keyStatus[action] > 0) {
        this.keyStatus[action]--
      }

      this.keyLocked[action] = false

      // prevent event propagation
      if (this.preventDefaultForKeys[keyCode] && (typeof e.preventDefault === 'function')) {
        // "fake" events generated through triggerKeyEvent do not have a preventDefault fn
        return e.preventDefault()
      } else {
        return true
      }
    }

    return true
  };

  isKeyPressed(action: string) {
    if (this.keyStatus[action] && !this.keyLocked[action]) {
      if (this.keyLock[action]) {
        this.keyLocked[action] = true
      }
      return true
    }
    return false
  };

  bindKey(keycode: string, action: string, lock: boolean, preventDefault?: boolean) {
    if (typeof preventDefault !== 'boolean') {
      preventDefault = this.preventDefault
    }

    this.keyBindings[keycode] = action
    this.preventDefaultForKeys[keycode] = preventDefault

    this.keyStatus[action] = 0
    this.keyLock[action] = lock ? lock : false
    this.keyLocked[action] = false
    this.keyRefs[action] = {}
  };

  initKeyboardEvent() {
    // make sure the keyboard is enable
    if (!this.keyBoardEventTarget && this.isMobile === false) {
      this.keyBoardEventTarget = window
      this.keyBoardEventTarget.addEventListener('keydown', this.keyDownEvent.bind(this), false)
      this.keyBoardEventTarget.addEventListener('keyup', this.keyUpEvent.bind(this), false)
    }
  };

}
