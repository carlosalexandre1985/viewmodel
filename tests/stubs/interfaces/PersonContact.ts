import { Entity } from "../../../src";
import ContactType from "./ContactType";

class PersonContact extends Entity {
    constructor() {
        super(true)

        this.addField('person', '')
        this.addField('type', new ContactType())
        this.addField('contact', '')
    }
}

export default PersonContact