import { SetRepository } from '../../core/repository/SetRepository'
import { GenericViewEntity } from '../../models/GenericViewEntity'
import { GenericPositionEntity } from '../../models/GenericPositionEntity'

export class SpriteRepository extends SetRepository<GenericViewEntity<GenericPositionEntity>> {
}
