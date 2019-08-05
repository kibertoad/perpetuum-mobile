export class SetRepository<T> {

  private entities: Set<T>

  public constructor() {
    this.entities = new Set<T>()
  }

  public add(entity: T) {
    this.entities.add(entity)
  }

  public remove(entity: T) {
    this.entities.delete(entity)
  }
}
