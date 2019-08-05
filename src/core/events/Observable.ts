export type SubscriberCallback<T> = (updatedValue: T) => void

export class Observable<T> {
  private subscribers: SubscriberCallback<T>[]

  public constructor() {
    this.subscribers = []
  }

  public subscribe(callbackFn: SubscriberCallback<T>) {
    this.subscribers.push(callbackFn)
  }

  public publishUpdate(value: T) {
    console.log('push it')

    this.subscribers.forEach((subscriber) => {
      console.log('pushed it')
      subscriber(value)
    })
  }
}
