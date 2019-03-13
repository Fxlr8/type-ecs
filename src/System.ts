import Component from './Component'
import ECS from './ECS'
import Entity from './Entity'

export default class System<ComponentDictType, ContextType> {
  public entities: Map<number, Entity<ComponentDictType>> = new Map()
  public componentFilter: string[] = []
  public world: ECS<ComponentDictType, ContextType>

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
    this.world = world
    return
  }

  public removedFromWorld() {
    this.world = undefined
    return
  }

  public getEntityKey(entity: Entity<ComponentDictType>) {
    return entity.id
  }

  public entityExsists(key: number) {
    return this.entities.has(key)
  }

  public entityFits(entity: Entity<ComponentDictType>) {
    return this.componentFilter.every(componentName => entity.getComponentNames().includes(componentName))
  }
}
