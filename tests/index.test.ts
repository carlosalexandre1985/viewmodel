import { Entity } from '../src/index';

describe('Given an index file', () => {
  test('it should be able to instance Entity', () => {
    let entity = new Entity()

    expect(entity).toBeInstanceOf(Entity);
  });

});