import { Entity } from "../../../src";

class PersonSecurity extends Entity {
    constructor() {
        super(true)

        this.addField('level', '')
        this.addField('login', '')
        this.addField('password', '')
    }
}

export default PersonSecurity