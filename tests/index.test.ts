import { Entity } from '../src/index';
import { Collection } from '../src/index';

describe('Given an index file', () => {
  test('it should be able to instance Entity', () => {
    let entity = new Entity()

    expect(entity).toBeInstanceOf(Entity);
  });

  test('it should be able to instance Collection', () => {
    let master = new Entity()

    let collection = new Collection(Entity, master)

    expect(collection).toBeInstanceOf(Collection);
  });
});