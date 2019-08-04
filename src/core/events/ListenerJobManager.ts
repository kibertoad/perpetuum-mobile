import { ActionStatusHolder, Events } from './Events'

export type ListenerManagerCondition = {
  action: string
  actionStatus: string
}

export type ListenerManagerDefinition = {
  enabledOn: ListenerManagerCondition
  disabledOn: ListenerManagerCondition
}

export type Job = {
  execute: Function
}

export type JobDefinition = {
  intervalInMsecs: number
  job: Job
}

export class ListenerJobManager {
  private eventBus: Events

  public constructor(eventBus: Events, jobDefinition: JobDefinition, listenerDefinition: ListenerManagerDefinition) {
    this.eventBus = eventBus

    let intervalDisabler
    eventBus.subscribe(listenerDefinition.enabledOn.action, (payload: ActionStatusHolder) => {
      // Do not duplicate listeners
      if (intervalDisabler) {
        return
      }

      if (payload.actionStatus === listenerDefinition.enabledOn.actionStatus) {
        intervalDisabler = setInterval(jobDefinition.job.execute.bind(jobDefinition.job), jobDefinition.intervalInMsecs)
      }
    })

    eventBus.subscribe(listenerDefinition.enabledOn.action, (payload: ActionStatusHolder) => {
      if (payload.actionStatus === listenerDefinition.disabledOn.actionStatus) {
        clearInterval(intervalDisabler)
        intervalDisabler = null
      }
    })
  }

  stop() {
    // TODO Not implemented yet
  }
}
