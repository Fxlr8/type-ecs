import { expect } from 'chai';
import ECS, { ECSEvent } from '../src/index'
import 'mocha';

class TestEvent implements ECSEvent {
	type = 1
	data = 'derp'
}

describe('ECS', () => {
	describe('events', () => {
		it('should add a callback and call it on event', (done) => {
			const ecs = new ECS()
			ecs.on(1, (e: TestEvent) => {
				expect(e.data).eq('derp')
				done()
			})
			const e = new TestEvent()
			ecs.createEvent(e)
		})
	})
})