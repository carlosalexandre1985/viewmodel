import EntityUtil from "../src/EntityUtil"
import Entity from "../src/Entity"

describe(`Given an EntityUtil class`, () => {
    let subject: EntityUtil
    let entity: Entity
    let json: Object

    beforeEach(() => {
        subject = new EntityUtil()
    })

    describe(`And an initialized json with no attributes`, () => {
        beforeEach(() => {
            json = {}
        })

        describe(`And an Entity instance called entity with some attributes`, () => {
            beforeEach(() => {
                entity = new Entity()

                entity.addField('attribute1', 'Attribute 1')
                entity.addField('attribute2', 100.98)
                entity.publicField = 'Public Field'
                entity.nullableField = null
                entity._privateAttribute = 'Private Attribute'

                const specialization: Entity = new Entity(false, entity)
                specialization.addField('attribute1', 'Attribute 1')
                specialization.addField('attribute2', 'Attribute 2')
                specialization.publicField = 'Public Field'
                specialization._privateAttribute = 'Private Attribute'

                entity.specialization = specialization
            })

            describe(`And Entity instance is not persistent`, () => {
                beforeEach(() => {
                    entity._isPersistent = false
                })

                describe(`And Entity instance is not a specialization`, () => {
                    beforeEach(() => {
                        entity._specializationOf = null
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as false`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, false)
                        })

                        test(`Then json should contain all non private attributes`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0,
                                    attribute1: 'Attribute 1',
                                    attribute2: 'Attribute 2',
                                    publicField: 'Public Field',
                                }
                            })
                        })
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as true`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, true)
                        })

                        test(`Then json should contain only id attribute`, () => {
                            expect(json).toEqual({
                                id: 0
                            })
                        })
                    })
                })

                describe(`And Entity instance is a specialization`, () => {
                    beforeEach(() => {
                        const anotherEntity = new Entity(true)

                        entity._specializationOf = anotherEntity
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as false`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, false)
                        })

                        test(`Then json should contain all non private attributes`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0,
                                    attribute1: 'Attribute 1',
                                    attribute2: 'Attribute 2',
                                    publicField: 'Public Field',
                                }
                            })
                        })
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as true`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, true)
                        })

                        test(`Then json should contain only id attribute`, () => {
                            expect(json).toEqual({
                                id: 0
                            })
                        })
                    })
                })
            })

            describe(`And Entity instance is persistent`, () => {
                beforeEach(() => {
                    entity._isPersistent = true
                })

                describe(`And Entity instance is not a specialization`, () => {
                    beforeEach(() => {
                        entity._specializationOf = null
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as false`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, false)
                        })

                        test(`Then json should contain all non private attributes`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0,
                                    attribute1: 'Attribute 1',
                                    attribute2: 'Attribute 2',
                                    publicField: 'Public Field',
                                }
                            })
                        })
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as true`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, true)
                        })

                        test(`Then json should contain all non private attributes and specialization should contain only id attribute`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0
                                }
                            })
                        })
                    })
                })

                describe(`And Entity instance is a specialization`, () => {
                    beforeEach(() => {
                        const anotherEntity = new Entity(true)

                        entity._specializationOf = anotherEntity
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as false`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, false)
                        })

                        test(`Then json should contain all non private attributes`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0,
                                    attribute1: 'Attribute 1',
                                    attribute2: 'Attribute 2',
                                    publicField: 'Public Field',
                                }
                            })
                        })
                    })

                    describe(`When populateJSONWithEntity static method is called with toPersistence parameter as true`, () => {
                        beforeEach(() => {
                            EntityUtil.populateJSONWithEntity(entity, json, true)
                        })

                        test(`Then json should contain only id attribute`, () => {
                            expect(json).toEqual({
                                id: 0,
                                attribute1: 'Attribute 1',
                                attribute2: 100.98,
                                publicField: 'Public Field',
                                nullableField: null,
                                specialization: {
                                    id: 0,
                                }
                            })
                        })
                    })
                })
            })
        })
    })
})