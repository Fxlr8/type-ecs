import Entity from './Entity'
import System from './System'
import IEvent from './Event'

/**
 * Class representing a ECS engine
 */
export default class ECS<ComponentDictType, ContextType> {
	public entities: Map<number, Entity<ComponentDictType>> = new Map()
	public systems: Array<System<ComponentDictType, ContextType>> = []

	/**
	 * Adds entity to world and all systems that it fits
	 */
	public addEntity(entity: Entity<ComponentDictType>) {
		this.entities.set(entity.id, entity)

		this.systems.forEach(system => system.onEntityAdd(entity))
	}

	/**
	 * Removes entity from world and every system it was added to
	 */
	public deleteEntity(e: Entity<ComponentDictType>) {
		const entity = this.entities.get(e.id)
		if (entity) {
			this.entities.delete(entity.id)
			this.systems.forEach(system => system.onEntityDelete(entity))
		}
	}

	/**
	 * Registers the system in the engine
	 */
	public addSystem(system: System<ComponentDictType, ContextType>) {
		system.addedToWorld(this)
		const entities = this.entities.forEach(e => {
			system.onEntityAdd(e)
		})
		this.systems.push(system)
	}

	/**
	 * Removes the system from the engine
	 */
	public removeSystem(system: System<ComponentDictType, ContextType>) {
		const i = this.systems.findIndex(s => s === system)
		if (i > -1) {
			this.systems[i].removedFromWorld()
			this.systems.splice(i, 1)
		}
	}

	public createEvent(e: IEvent) {
		this.systems.forEach(system => system.onEvent(e))
	}

}
