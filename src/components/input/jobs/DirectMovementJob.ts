import { Job, ListenerJobManager } from '../../../core/events/ListenerJobManager'
import { ACTION_STATUS, DEFAULT_ACTIONS } from '../input.component'
import { Events } from '../../../core/events/Events'
import { PositionHolder } from '../../../types/entity-types'

const DEFAULT_MOVEMENT_INTERVAL = 50
const DEFAULT_MOVEMENT_DELTA = 1

export class DirectMovementJob implements Job {
  private deltaX: number
  private deltaY: number
  private target: PositionHolder

  public constructor(target: PositionHolder, direction: Direction, movementDelta: number = DEFAULT_MOVEMENT_DELTA) {
    this.target = target

    switch (direction) {
      case Direction.Left:
        this.deltaX = -movementDelta
        this.deltaY = 0
        break

      case Direction.Right:
        this.deltaX = movementDelta
        this.deltaY = 0
        break

      case Direction.Up:
        this.deltaX = 0
        this.deltaY = -movementDelta
        break

      case Direction.Down:
        this.deltaX = 0
        this.deltaY = movementDelta
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

export function newJobManager(
  events: Events,
  direction: Direction,
  target: PositionHolder,
  movementDelta: number = DEFAULT_MOVEMENT_DELTA,
  movementInterval: number = DEFAULT_MOVEMENT_INTERVAL
) {
  return new ListenerJobManager(
    events,
    {
      job: new DirectMovementJob(target, direction, movementDelta),
      intervalInMsecs: movementInterval
    },
    {
      enabledOn: {
        action: directionToActionMap[direction],
        actionStatus: ACTION_STATUS.Start
      },
      disabledOn: {
        action: directionToActionMap[direction],
        actionStatus: ACTION_STATUS.End
      }
    }
  )
}
