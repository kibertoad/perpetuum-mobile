import { Job, ListenerJobManager } from '../../../src/core/events/ListenerJobManager'
import { ACTION_STATUS, DEFAULT_ACTIONS } from '../../../src/components/input/input.component'
import { Events } from '../../../src/core/events/Events'
import { EntityPosition, PositionHolder } from '../../../src/types/entity-types'

const MOVEMENT_INTERVAL = 50

const MOVEMENT_DELTA = 1

export class MovementJob implements Job {

  private deltaX: number
  private deltaY: number
  private target: PositionHolder

  public constructor(target: PositionHolder, direction: Direction) {
    this.target = target

    switch (direction) {
      case Direction.Left:
        this.deltaX = -MOVEMENT_DELTA
        this.deltaY = 0
        break

      case Direction.Right:
        this.deltaX = MOVEMENT_DELTA
        this.deltaY = 0
        break

      case Direction.Up:
        this.deltaX = 0
        this.deltaY = -MOVEMENT_DELTA
        break

      case Direction.Down:
        this.deltaX = 0
        this.deltaY = MOVEMENT_DELTA
        break

      default:
        throw new Error('Unknown direction')
    }
  }

  execute() {
    this.target.move(this.deltaX, this.deltaY)
    console.log(`Moved. New position: ${this.target.getPosition().x}/${this.target.getPosition().y} `)
  }
}


export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

const directionToActionMap: Record<Direction, string> = Object.freeze({
  [Direction.Up]: DEFAULT_ACTIONS.Up,
  [Direction.Down]: DEFAULT_ACTIONS.Down,
  [Direction.Left]: DEFAULT_ACTIONS.Left,
  [Direction.Right]: DEFAULT_ACTIONS.Right
})

export function newJobManager(events: Events, direction: Direction, target: PositionHolder) {
  return new ListenerJobManager(events, {
    job: new MovementJob(target, direction),
    intervalInMsecs: MOVEMENT_INTERVAL
  }, {
    enabledOn: {
      action: directionToActionMap[direction],
      actionStatus: ACTION_STATUS.Start
    },
    disabledOn: {
      action: directionToActionMap[direction],
      actionStatus: ACTION_STATUS.End
    }
  })

}

