import EventEmitter, { ListenerFn } from 'eventemitter3'

export interface ActionStatusHolder {
  actionStatus: string
}

export class Events {
  private eventEmitter: EventEmitter

  public constructor() {
    this.eventEmitter = new EventEmitter<string|symbol>()
  }

  public subscribe(event: string, listener: ListenerFn) {
    this.eventEmitter.on(event, listener)
  }

  public publish(event: string, payload?: any) {
    this.eventEmitter.emit(event, payload)
  }

  public clear(event?: string) {
    this.eventEmitter.removeAllListeners(event)
  }

  public removeListener(event: string, listener: ListenerFn) {
    this.eventEmitter.removeListener(event, listener)
  }

}
