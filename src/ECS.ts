import Entity from './Entity'
import System from './System'

/**
 * Class representing a ECS engine
 */
export default class ECS<EntityType extends Entity, ContextType> {
	public entities: Map<number, EntityType> = new Map()
	public systems: Array<System<EntityType, ContextType, ECS<EntityType, ContextType>>> = []

	/**
	 * Adds entity to world and all systems that it fits
	 */
	public addEntity(entity: EntityType) {
		this.entities.set(entity.id, entity)

		this.systems.forEach(system => system.onEntityAdd(entity))
	}

	/**
	 * Removes entity from world and every system it was added to
	 */
	public deleteEntity(e: EntityType) {
		const entity = this.entities.get(e.id)
		if (entity) {
			this.entities.delete(entity.id)
			this.systems.forEach(system => system.onEntityDelete(entity))
		}
	}

	/**
	 * Registers the system in the engine
	 */
	public addSystem(system: System<EntityType, ContextType, ECS<EntityType, ContextType>>) {
		system.addedToWorld(this)
		this.entities.forEach(e => {
			system.onEntityAdd(e)
		})
		this.systems.push(system)
	}

	/**
	 * Removes the system from the engine
	 */
	public removeSystem(system: System<EntityType, ContextType, ECS<EntityType, ContextType>>) {
		const i = this.systems.findIndex(s => s === system)
		if (i > -1) {
			this.systems[i].removedFromWorld()
			this.systems.splice(i, 1)
		}
	}
}
