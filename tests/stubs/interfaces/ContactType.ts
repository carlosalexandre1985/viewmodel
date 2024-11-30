import { Entity } from "../../../src";

class ContactType extends Entity {
    constructor(persistent: boolean = false) {
        super(persistent)

        this.addField('description', this._isPersistent ? '' : 'Undefined')
    }
}

export default ContactType