import { Entity } from "../../src";
import ContactType from "./interfaces/ContactType";
import Person from "./interfaces/Person";
import PersonContact from "./interfaces/PersonContact";
import IStub from "./Stub";

class PersonStub implements IStub {
    _entity: Entity
    _json: any
    _persistentJSON: any

    constructor(persistent: boolean = false) {
        this._entity = new Person(persistent)

        this._entity.id = 'mocked-person-id'
        this._entity.name = 'mocked-person-name'

        this._entity.group.id = 'mocked-group-id'
        this._entity.group.description = 'mocked-group-description'

        this._entity.birthDate = new Date('1985-11-26T20:50:00.000Z')

        this._entity.security.level = 'mocked-level'
        this._entity.security.login = 'mocked-login'
        this._entity.security.password = 'mocked-password'

        const contactType1 = new ContactType()
        contactType1.description = 'Phone'

        const contactType2 = new ContactType()
        contactType2.description = 'Mail'

        const personContact1 = new PersonContact()
        personContact1.type = contactType1
        personContact1.contact = '+55 (32) 99999-9999'

        const personContact2 = new PersonContact()
        personContact2.type = contactType2
        personContact2.contact = 'me@gmail.com'

        this._entity.contacts.add(personContact1)
        this._entity.contacts.add(personContact2)
    }

    get entity(): Entity {
        return this._entity
    }

    get json(): any {
        this._json = {
            id: this.entity.id,
            name: this.entity.name,
            group: {
                id: this.entity.group.id,
                description: this.entity.group.description
            }
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
                name: this.entity.name,
                group: {
                    id: this.entity.group.id,
                    description: this.entity.group.description
                }
            }
        }

        return this._persistentJSON
    }
}

export default PersonStub