import Entity from './Entity'

type KeyType = number | string

/**
 * Class representing an ECS system
 */
export default class System<EntityType extends Entity, ContextType, ECSType> {
	public entities: Map<KeyType, EntityType> = new Map()
	public componentFilter: string[] = []
	public world: ECSType

	constructor(world: ECSType) {
		this.world = world
	}

	public onEntityAdd(entity: EntityType): boolean {
		const key = this.getEntityKey(entity)
		if (this.entityFits(entity) && !this.entityExsists(key)) {
			this.entities.set(this.getEntityKey(entity), entity)
			return true
		}
		return false
	}

	public update(dt: number, context: ContextType) {
		return
	}

	public onEntityDelete(entity: EntityType): boolean {
		return this.entities.delete(this.getEntityKey(entity))
	}

	public addedToWorld(world: ECSType) {
		return
	}

	public removedFromWorld() {
		return
	}

	public getEntityKey(entity: EntityType): KeyType {
		return entity.id as KeyType
	}

	public entityExsists(key: KeyType) {
		return this.entities.has(key)
	}

	public entityFits(entity: EntityType) {
		return this.componentFilter.every(componentName => entity.getComponentNames().includes(componentName))
	}
}
