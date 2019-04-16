import ECS from './ECS'
import Entity from './Entity'
import IEvent from './Event'

type KeyType = number | string

interface ISystem<ComponentDictType, ContextType> {
	entities: Map<KeyType, Entity<ComponentDictType>>
	events: Array<IEvent>
	componentFilter: string[]
	world: ECS<ComponentDictType, ContextType>

	onEntityAdd(entity: Entity<ComponentDictType>): boolean
	onEntityDelete(entity: Entity<ComponentDictType>): boolean
	update(dt: number, context: ContextType): void
	/**
	 * Triggered when the system is added to world
	 */
	addedToWorld(world: ECS<ComponentDictType, ContextType>):void
	removedFromWorld(): void
	/**
	 * Get a key by which an entity will be stored in the system
	 */
	getEntityKey(entity: Entity<ComponentDictType>): KeyType
	/**
	 * Check if the entity in this system's storage
	 */
	entityExsists(key: KeyType): boolean
	/**
	 * Check if the entity can be added to this system.
	 * By default checks if the entity has all the components listed in the componentFilter array
	 */
	entityFits(entity: Entity<ComponentDictType>): boolean
	/**
	 * Called on new event from ECS
	 */
	onEvent(e: IEvent): void
}

/**
 * Class representing an ECS system
 */
export default class System<ComponentDictType = {}, ContextType = {}> implements ISystem<ComponentDictType, ContextType> {
	public entities: Map<KeyType, Entity<ComponentDictType>> = new Map()
	public componentFilter: string[] = []
	public events: Array<IEvent> = []
	public world: ECS<ComponentDictType, ContextType>

	constructor(world: ECS<ComponentDictType, ContextType>) {
		this.world = world
	}

	public onEntityAdd(entity: Entity<ComponentDictType>): boolean {
		const key = this.getEntityKey(entity)
		if (!this.entityExsists(key) && this.entityFits(entity)) {
			this.entities.set(this.getEntityKey(entity), entity)
			return true
		}
		return false
	}

	public update(dt: number, context: ContextType) {
		return
	}

	public onEntityDelete(entity: Entity<ComponentDictType>): boolean {
		return this.entities.delete(this.getEntityKey(entity))
	}

	public addedToWorld(world: ECS<ComponentDictType, ContextType>) {
		return
	}

	public removedFromWorld() {
		return
	}

	public getEntityKey(entity: Entity<ComponentDictType>): KeyType {
		return entity.id as KeyType
	}

	public entityExsists(key: KeyType) {
		return this.entities.has(key)
	}

	public entityFits(entity: Entity<ComponentDictType>) {
		return this.componentFilter.every(componentName => entity.getComponentNames().includes(componentName))
	}

	public onEvent(e: IEvent) {
		return
	}
}
