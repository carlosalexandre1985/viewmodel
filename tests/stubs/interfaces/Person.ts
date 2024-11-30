import { Entity } from "../../../src"
import Group from "./Group"
import PersonContact from "./PersonContact"
import PersonSecurity from "./PersonSecurity"

class Person extends Entity {
    // name: String
    // group: Group
    // birthDate: Date
    // contacts: Collection

    constructor(isPersistent: boolean = false) {
        super(isPersistent)

        // this.name = ''
        // this.group = new Group()
        // this.birthDate = new Date()
        // this.contacts = new Collection(PersonContact, this, ['person'], ['id'], 'id')

        this.addField('name', '')
        this.addField('group', new Group())
        this.addField('birthDate', new Date())
        this.addCalculatedField('age', () => (this.getAge()))
        this.addField('nullableField', null)
        this.addField('security', new PersonSecurity())
        this.addCollectionField('contacts', PersonContact, ['person'], ['id'], 'id')

        if (!this._isPersistent) {
            this.name = 'Undefined'
        }
    }

    public getAge() {
        if (!this.birthDate) {
            return 0
        }

        let difference = Date.now() - this.birthDate.getTime()
        var ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

export default Person

// id: 0,
// attribute1: 'Attribute 1',
// attribute2: 100.98,
// publicField: 'Public Field',
// nullableField: null,
// specialization: {
//     id: 0,
//     attribute1: 'Attribute 1',
//     attribute2: 'Attribute 2',
//     publicField: 'Public Field',
// }