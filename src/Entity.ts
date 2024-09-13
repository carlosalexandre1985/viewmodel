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
    // json
    // --------------------------------------
    get json(): object {
        let json = {}

        EntityUtil.populateJSONWithEntity(this, json)

        return json
    }

    // --------------------------------------
    // persistentJSON
    // --------------------------------------
    get persistentJSON(): object {
        let json = {}

        EntityUtil.populateJSONWithEntity(this, json, true)

        return json
    }
}

export default Entity
