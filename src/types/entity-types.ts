export type EntityPosition = {
  x: number
  y: number
}

export interface PositionHolder {
  move(deltaX: number, deltaY: number)
  getPosition(): EntityPosition
}
