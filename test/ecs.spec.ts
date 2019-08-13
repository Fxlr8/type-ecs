import { expect } from 'chai';
import ECS, { Entity, Component, System } from '../src/index'

interface TestComponents {
	n: number,
	s: string
}

interface TestContext {
	foo: number[]
}

class TestEntity extends Entity<TestComponents> {

}

class TestSystem<Tcontext extends TestContext = TestContext> extends System<TestEntity, TestContext, TestGame<Tcontext>> {
	constructor(world: TestGame<Tcontext>) {
		super(world)

	}

	update() {
		this.world
	}
}

class TestGame<TContext extends TestContext> extends ECS<TestEntity, TContext> {
	public derp = 'herp'
	constructor() {
		super()

		this.addSystem(new TestSystem(this))
	}
}

interface TestModeContext extends TestContext {
	baz: string
}

class TestModeSystem extends System<TestEntity, TestModeContext, TestGameMode> {
	constructor(world: TestGameMode) {
		super(world)

		this.world.derp
		this.world.herp
	}
}

class TestGameMode extends TestGame<TestModeContext> {
	public herp = 'derp'
	constructor() {
		super()

		this.addSystem(new )
	}
}