import { Entity } from "../../src";
import Group from "./interfaces/Group";
import IStub from "./Stub";

class GroupStub implements IStub {
    _entity: Entity
    _json: any
    _persistentJSON: any

    constructor(persistent: boolean = false) {
        this._entity = new Group(persistent)
    }

    get entity(): Entity {
        this._entity.id = 'mocked-group-id'
        this._entity.description = 'mocked-group-description'

        return this._entity
    }

    get json(): any {
        this._json = {
            id: this.entity.id,
            description: this.entity.description
        }

        return this._json
    }

    get persistentJSON(): any {
        this._persistentJSON = {
            id: this.entity.id
        }

        if (this.entity._isPersistent) {
            this._persistentJSON = {
                ... this._persistentJSON,
                description: this.entity.description
            }
        }

        return this._persistentJSON
    }
}

export default GroupStub