import Collection from "./Collection";
import EntityUtil from "./EntityUtil";

class Entity {
    [key: string]: any;

    id: Number | String

    _isPersistent: boolean

    // when it is a specialization of another class
    _specializationOf?: Entity | null

    // TODO: id | key | codigo -> define a way to identify or set as "key" (a good name)

    // --------------------------------------
    // constructor
    // --------------------------------------
    constructor(isPersistent?: boolean, specializationOf?: Entity | null) {
        this._isPersistent = isPersistent || false
        this._specializationOf = specializationOf || null

        this.id = 0
    }

    // --------------------------------------
    // reset
    // --------------------------------------
    reset() {
        return this.constructor.call(this)
    }

    // --------------------------------------
    // addField
    // --------------------------------------
    addField(fieldName: string, defautValue: any, getter?: Function, setter?: Function): void {
        const propertyDescriptor: PropertyDescriptor = {
            enumerable: true,
            configurable: true,
            writable: true,
            value: defautValue
        }

        if (getter) {
            delete propertyDescriptor.writable
            delete propertyDescriptor.value

            propertyDescriptor.get = () => {
                return getter()
            }
        }

        if (setter) {
            delete propertyDescriptor.writable
            delete propertyDescriptor.value

            propertyDescriptor.set = (value: any) => {
                setter(value)
            }
        }

        Object.defineProperty(this, fieldName, propertyDescriptor)
    }

    // --------------------------------------
    // addCalculatedField
    // --------------------------------------
    addCalculatedField(fieldName: string, calculation: Function) {
        this.addField(fieldName, null, calculation)
    }

    // --------------------------------------
    // addCollectionField
    // --------------------------------------
    addCollectionField(fieldName: string, entityClass: typeof Entity, foreignKeys: string[] = [], masterKeys: string[] = [], keyField: string = 'id') {
        this.addField(fieldName, new Collection(entityClass, this, foreignKeys, masterKeys, keyField))
    }

    // --------------------------------------
    // json
    // --------------------------------------
    get json(): object {
        let json = {}

        EntityUtil.populateJSONWithEntity(this, json, false)

        return json
    }

    set json(value) {
        EntityUtil.populateEntityWithJSON(this, value)
    }

    // --------------------------------------
    // persistentJSON
    // --------------------------------------
    get persistentJSON(): object {
        let json = {}

        EntityUtil.populateJSONWithEntity(this, json, true)

        return json
    }

    // --------------------------------------
    // sync
    // --------------------------------------
    syncFrom(master: Entity) {
        this.json = master.json
    }

    syncTo(target: Entity) {
        target.json = this.json
    }

    // --------------------------------------
    // clone
    // --------------------------------------
    clone(): Entity {
        const entityClass:any = this.constructor

        let clone:Entity = new entityClass(this._isPersistent, this._specializationOf)

        this.syncTo(clone)

        return clone
    }
}

export default Entity
