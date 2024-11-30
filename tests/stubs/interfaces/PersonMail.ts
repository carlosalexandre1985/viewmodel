import { Entity } from "../../../src";

class PersonMail extends Entity {
    constructor() {
        super(true)

        this.addField('mail', '')
        this.addField('observation', '')
    }
}