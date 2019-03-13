import Component from './Component'

let uid = 0

export default class Entity<ComponentDictType> {
	public id: number
	public components: ComponentDictType
	constructor() {
		uid += 1
		this.id = uid
	}
	public addComponent(component: Component) {
		this.components[component.name] = component
	}
	public removeComponent(component: Component) {
		this.components[component.name] = undefined
	}
	public getComponentNames() {
		return Object.keys(this.components)
	}
}
