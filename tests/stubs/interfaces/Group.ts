import { Entity } from "../../../src"

export default class Group extends Entity {
    constructor(isPersistent: boolean = false) {
        super(isPersistent)

        this.addField('description', '')

        if (!this._isPersistent) {
            this.description = 'Undefined'
        }
    }
}