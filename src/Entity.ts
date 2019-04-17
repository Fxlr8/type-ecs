import Component from './Component'

let uid = 0

/**
 * Class representing an ECS entity
 */
export default class Entity<ComponentDictType = {}> {
	public id: number
	/**
	 * A dict of all components of an Entity
	 */
	public components: Partial<ComponentDictType> = {}
	constructor() {
		uid += 1
		this.id = uid
	}
	/**
	 * Adds the component to the entity by name
	 */
	public addComponent(component: Component) {
		if(!component.name) {
			throw 'Component must have a name'
		}
		this.components[component.name] = component
	}
	/**
	 * Removes the component from the entity
	 */
	public removeComponent(component: Component): boolean {
		return delete this.components[component.name]
	}
	/**
	 * Returns an array of component names of the entity
	 */
	public getComponentNames() {
		return Object.keys(this.components)
	}
}