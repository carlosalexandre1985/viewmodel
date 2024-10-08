import Entity from '../src/Entity'
import EntityUtil from '../src/EntityUtil';

jest.mock('../src/EntityUtil')

describe(`Given an instance of Entity called entity with default constructor`, () => {
    let entity: Entity

    beforeEach(() => {
        entity = new Entity()
    })

    describe(`When nothing is changed`, () => {
        test(`Then its "id" attribute should be zero`, () => {
            expect(entity.id).toBe(0)
        });

        test(`Then its "_isPersistent" attribute should be false`, () => {
            expect(entity._isPersistent).toBeFalsy()
        });

        test(`Then its "_specializationOf" attribute should be null`, () => {
            expect(entity._specializationOf).toBeNull()
        });
    })

    describe(`When entity.id is set to 20`, () => {
        beforeEach(() => {
            entity.id = 20
        })

        test(`Then its "id" should return 20`, () => {
            expect(entity.id).toBe(20)
        })

        describe(`And entity.reset method is called`, () => {
            beforeEach(() => {
                entity.reset()
            })

            test(`Then its "id" should return 0`, () => {
                entity.reset()

                expect(entity.id).toBe(0)
            })
        })
    })

    describe(`When entity adds a new field called "description" with defaultValue "My description"`, () => {
        beforeEach(() => {
            entity.addField('description', 'My description')
        })

        test(`Then its "description" attribute should return the "My description"`, () => {
            expect(entity.description).toBe('My description')
        })

        describe(`And entity.description value is changed to "My description 2"`, () => {
            beforeEach(() => {
                entity.description = 'My description 2'
            })

            test(`Then its "description" attribute should return the "My description 2"`, () => {
                expect(entity.description).toBe('My description 2')
            })
        })
    })

    describe(`When entity adds a new field called "quantity" with defaultValue 3`, () => {
        beforeEach(() => {
            entity.addField('quantity', 3)
        })

        test(`Then its "quantity" attribute should return the 3`, () => {
            expect(entity.quantity).toBe(3)
        })

        describe(`And entity adds a new field called "price" with defaultValue 5`, () => {
            beforeEach(() => {
                entity.addField('price', 5)
            })

            test(`Then its "price" attribute should return the 5`, () => {
                expect(entity.price).toBe(5)
            })

            describe(`And entity adds a calculated field called "total" that returns quantity * price`, () => {
                beforeEach(() => {
                    entity.addCalculatedField('total', () => (entity.quantity * entity.price))
                })

                test(`Then its "price" attribute should return the 15`, () => {
                    expect(entity.total).toBe(15)
                })
            })
        })
    })

    describe(`When entity adds a new field called "field" with any defaultValue and a getter return "hello"`, () => {
        beforeEach(() => {
            entity.addField('field', null, () => ("hello"))
        })

        test(`Then its "field" attribute should return the "hello"`, () => {
            expect(entity.field).toBe('hello')
        })
    })

    describe(`When entity adds a new field called "_count" with any defaultValue 10`, () => {
        beforeEach(() => {
            entity.addField('_count', 10)
        })

        test(`Then its "_count" attribute should return the 10`, () => {
            expect(entity._count).toBe(10)
        })

        describe(`And entity adds a new field called "count" with a getter and setter to _count`, () => {
            beforeEach(() => {
                entity.addField('count', null, () => (entity._count), (value: number) => entity._count = value)
            })

            test(`Then its "count" attribute should return the 10`, () => {
                expect(entity.count).toBe(10)
            })

            test(`Then its after setting "count" to 15 getting "count" should return 15`, () => {
                entity.count = 15
                expect(entity.count).toBe(15)
                expect(entity._count).toBe(15)
            })
        })
    })

    describe(`When entity adds a new collection field called "items"`, () => {
        beforeEach(() => {
            entity.addCollectionField('items', Entity)
        })

        test(`Then items.data should be an array`, () => {
            expect(entity.items.data).toBeDefined()
        })
    })

    describe(`When entity.json getter is called`, () => {
        beforeEach(() => {
            const json = entity.json
        })

        test(`Then EntityUtil.populateJSONWithEntity should be called`, () => {
            expect(EntityUtil.populateJSONWithEntity).toHaveBeenCalledWith(entity, {}, false)
        })
    })

    describe(`When entity.json setter is called`, () => {
        const json = {
            id: 10
        }

        beforeEach(() => {
            entity.json = json
        })

        test(`Then EntityUtil.populateEntity should be called`, () => {
            expect(EntityUtil.populateEntityWithJSON).toHaveBeenCalledWith(entity, json)
        })
    })

    describe(`When entity.clone is called`, () => {
        let cloned:any

        beforeEach(() => {
            cloned =  entity.clone()
        })

        test(`Then the entity cloned should have the same content of the original one`, () => {
            expect(cloned.json).toEqual(entity.json)
        })

        test(`And EntityUtil.populateEntityWithJSON to have been caleed`, () => {
            expect(EntityUtil.populateEntityWithJSON).toHaveBeenCalled()
        })
    })

    describe(`And another instance of Entity called entity2 with id 10`, () => {
        let entity2: Entity

        beforeEach(() => {
            entity2 = new Entity()
            entity.id = 10
        })

        describe(`When entity.syncFrom is called with entity2 as param`, () => {
            beforeEach(() => {
                entity.syncFrom(entity2)
            })

            test(`Then json of both instances should be the same`, () => {
                expect(entity.json).toEqual(entity2.json)
            })
        })

        describe(`When entity2.syncTo is called with entity as param`, () => {
            beforeEach(() => {
                entity2.syncTo(entity)
            })

            test(`Then json of both instances should be the same`, () => {
                expect(entity.json).toEqual(entity2.json)
            })
        })
    })
});