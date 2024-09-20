import Entity from "./Entity"

class Collection {
    data: Array<Entity> = []
    entityClass: typeof Entity
    master: Entity
    masterKeys: string[]
    foreignKeys: string[]
    keyField: string

    // --------------------------------------
    // constructor
    // --------------------------------------
    constructor(entityClass: typeof Entity, master: Entity, foreignKeys: string[] = [], masterKeys: string[] = [], keyField: string = 'id') {
        this.entityClass = entityClass
        this.master = master
        this.masterKeys = masterKeys
        this.foreignKeys = foreignKeys
        this.keyField = keyField
    }

    // --------------------------------------
    // constructor
    // --------------------------------------
    getNewEntityInstance(): Entity {
        return new this.entityClass()
    }

    // --------------------------------------
    // add
    // --------------------------------------
    add(entity: Entity) {
        this.data.push(entity)

        this.defineKeys(entity)
        this.defineCollection(entity)
    }

    // --------------------------------------
    // remove
    // --------------------------------------
    remove(entity: Entity) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === entity) {
                this.data.splice(i, 1)
                break
            }
        }
    }

    // --------------------------------------
    // clear
    // --------------------------------------
    clear() {
        this.data = []
    }

    // --------------------------------------
    // defineKeys
    // --------------------------------------
    defineKeys(entity: Entity) {
        for (let i = 0; i < this.foreignKeys.length; i++) {
            const foreignKey = this.foreignKeys[i]
            var masterKey = this.masterKeys[i]

            // set the foreign key with the corresponding key on master
            entity[foreignKey] = this.master[masterKey]
        }
    }

    // --------------------------------------
    // defineCollection
    // --------------------------------------
    /**
     * Once the collection is difined, it's possible to know that an entity is inside a collection
     * Thus it's possible to walk from bottom to top through master (_collection.master)
     *
     * @param entity
     */
    defineCollection(entity: Entity) {
        entity._collection = this
    }

    // --------------------------------------
    // json
    // --------------------------------------
    get json() {
        let json = []

        for (const entity of this.data) {
            json.push(entity.json)
        }

        return json
    }

    set json(value: any) {
        this.clear()

        for (const json of value) {
            let entity = this.getNewEntityInstance()

            entity.json = json
            this.add(entity)
        }
    }

    // --------------------------------------
    // persistentJSON
    // --------------------------------------
    get persistentJSON() {
        let json = []

        for (const entity of this.data) {
            json.push(entity.persistentJSON)
        }

        return json
    }

    // --------------------------------------
    // sync
    // --------------------------------------
    syncFrom(master: Collection) {
        this.json = master.json
    }

    syncTo(target: Collection) {
        target.json = this.json
    }
}

export default Collection
