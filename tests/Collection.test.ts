import { Collection, Entity } from "../src"
import EntityUtil from '../src/EntityUtil';

jest.mock('../src/EntityUtil')

describe(`Given an instance of Entity called master with id = 10 And an instance of Collection called collection`, () => {
    let master: Entity
    let collection: Collection

    beforeEach(() => {
        master = new Entity()
        master.id = 'mocked-id'
        master.company = 'mocked-company-id'
        master.unity = 'mocked-unity-id'

        collection = new Collection(Entity, master, ['company', 'unity'], ['company', 'unity'], 'id')
    })

    describe(`And some Entities called entity1, entity2 and entity3`, () => {
        let entity1: Entity
        let entity2: Entity
        let entity3: Entity

        beforeEach(() => {
            entity1 = new Entity(true)
            entity2 = new Entity(true)
            entity3 = new Entity(true)
        })

        describe(`When collection.add is called with entity1 as parameter`, () => {
            beforeEach(() => {
                collection.add(entity1)
            })

            test(`Then collection.data should have one element`, () => {
                expect(collection.data.length).toBe(1)
                expect(entity1.company).toBe(master.company)
                expect(entity1.unity).toBe(master.unity)
            })

            describe(`When collection.json getter is called`, () => {
                let json: any

                beforeEach(() => {
                    json = collection.json
                })

                test(`Then EntityUtil.populateJSONWithEntity should be called once with the correct params`, () => {
                    expect(EntityUtil.populateJSONWithEntity).toHaveBeenCalledTimes(1)
                    expect(EntityUtil.populateJSONWithEntity).toHaveBeenCalledWith(entity1, {}, false)
                })
            })

            describe(`When collection.json setter is called with one element`, () => {
                const json: any = [{
                    description: 'changed'
                }]

                beforeEach(() => {
                    collection.json = json
                })

                test(`Then EntityUtil.populateEntityWithJSON should be called once with the correct params`, () => {
                    expect(EntityUtil.populateEntityWithJSON).toHaveBeenCalledTimes(1)
                    expect(EntityUtil.populateEntityWithJSON).toHaveBeenCalledWith(expect.anything(), json[0])
                })
            })

            describe(`When collection.persistedJSON getter is called`, () => {
                let json: any

                beforeEach(() => {
                    json = collection.persistentJSON
                })

                test(`Then EntityUtil.populateJSONWithEntity should be called once`, () => {
                    expect(EntityUtil.populateJSONWithEntity).toHaveBeenCalledTimes(1)
                    expect(EntityUtil.populateJSONWithEntity).toHaveBeenCalledWith(entity1, {}, true)
                })
            })

            describe(`And collection.add is called with entity2 as parameter`, () => {
                beforeEach(() => {
                    collection.add(entity2)
                })

                test(`Then collection.data should have two elements`, () => {
                    expect(collection.data.length).toBe(2)
                })

                describe(`And collection.add is called with entity3 as parameter`, () => {
                    beforeEach(() => {
                        collection.add(entity3)
                    })

                    test(`Then collection.data should have three elements`, () => {
                        expect(collection.data.length).toBe(3)
                    })

                    describe(`When collection.remove is called with entity2 as parameter`, () => {
                        beforeEach(() => {
                            collection.remove(entity2)
                        })

                        test(`Then collection.data should have two elements: entity1 and entity2`, () => {
                            expect(collection.data.length).toBe(2)
                            expect(collection.data[0]).toBe(entity1)
                            expect(collection.data[1]).toBe(entity3)
                        })
                    })

                    describe(`When collection.clear is called`, () => {
                        beforeEach(() => {
                            collection.clear()
                        })

                        test(`Then collection.data should be empty`, () => {
                            expect(collection.data.length).toBe(0)
                        })
                    })
                })
            })

            describe(`And another instance of Collction called targetCollection`, () => {
                let targetCollection: Collection

                beforeEach(() => {
                    targetCollection = new Collection(Entity, master, ['company', 'unity'], ['company', 'unity'], 'id')
                })

                describe(`When collection.syncTo is called with targetColleciton as param`, () => {
                    beforeEach(() => {
                        collection.syncTo(targetCollection)
                    })

                    test(`Then the json of both should be the same`, () => {
                        expect(collection.json).toEqual(targetCollection.json)
                    })
                })

                describe(`When targetColleciton.syncFrom is called with colleciton as param`, () => {
                    beforeEach(() => {
                        targetCollection.syncFrom(collection)
                    })

                    test(`Then the json of both should be the same`, () => {
                        expect(collection.json).toEqual(targetCollection.json)
                    })
                })
            })

        })
    })
})