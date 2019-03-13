import Entity from './Entity'
import System from './System'

export default class ECS<ComponentDictType, ContextType> {
	public entities: Map<number, Entity<ComponentDictType>> = new Map()
	public systems: Array<System<ComponentDictType, ContextType>> = []

	public addEntity(entity: Entity<ComponentDictType>) {
		this.entities.set(entity.id, entity)

		this.systems.forEach(system => system.onEntityAdd(entity))
	}

	public deleteEntity(e: Entity<ComponentDictType>) {
		const entity = this.entities.get(e.id)
		if (entity) {
			this.entities.delete(entity.id)
			this.systems.forEach(system => system.onEntityDelete(entity))
		}
	}

	public addSystem(system: System<ComponentDictType, ContextType>) {
		system.addedToWorld(this)
		const entities = this.entities.forEach(e => {
			system.onEntityAdd(e)
		})
		this.systems.push(system)
	}

	public removeSystem(system) {
		const i = this.systems.findIndex(s => s === system)
		if (i > -1) {
			this.systems[i].removedFromWorld()
			this.systems.splice(i, 1)
		}
	}

}
