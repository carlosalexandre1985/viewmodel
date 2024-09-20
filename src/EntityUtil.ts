import Entity from "./Entity"
import Collection from "./Collection"

class EntityUtil {
    // --------------------------------------
    // populateJSONWithEntity
    // --------------------------------------
    static populateJSONWithEntity(entity: Entity, json: any, toPersistence: boolean) {
        // populate only the id whether the finality is "toPersistence" but entity isn't persistent
        if (toPersistence && !entity._isPersistent) {
            json.id = entity.id
            return
        }

        // loop on entity attributes ...
        for (const attribute in entity) {
            // ignore private attributes
            if (this.isPrivateAttribute(attribute)) {
                continue
            }

            // when attribute is id
            if (attribute === 'id' && entity._specializationOf) {
                json[attribute] = entity._specializationOf.id
                continue
            }

            // when attribute content is null
            if (entity[attribute] === null) {
                json[attribute] = null
                continue
            }

            // Treat field by its class name ...
            const className = entity[attribute].constructor.name

            // Collection
            if (className === Collection.name) {
                const collection = entity[attribute]
                json[attribute] = toPersistence ? collection.persistentJSON : collection.json
                continue
            }

            // Date
            if (className === Date.name) {
                json[attribute] = entity[attribute].toJSON()
                continue
            }

            // Function
            if (className === Function.name) {
                continue
            }

            // Other types
            const type = typeof (entity[attribute])

            // non primitive type
            if (type === 'object') {
                json[attribute] = toPersistence ? entity[attribute].persistentJSON : entity[attribute].json
                continue
            }

            // primitive type
            json[attribute] = entity[attribute]
        }
    }

    // --------------------------------------
    // populateEntityWithJSON
    // --------------------------------------
    static populateEntityWithJSON(entity: Entity, json: any) {
        for (const attribute in json) {
            // it ignores attributes that is not present on entity
            // Previously, it was using entity.hasOwnProperty(attribute), but getter and setters
            // weren't being considered, because it is a pseudo-property.
            if (entity[attribute] === undefined) {
                continue
            }

            // it ignores private attributes
            if (this.isPrivateAttribute(attribute)) {
                continue
            }

            // when it's not possible verify the attribute constructor, it set the value directly
            if (entity[attribute] === null) {
                entity[attribute] = json[attribute]
                continue
            }

            // Collection
            const className = entity[attribute].constructor.name

            if (className === Collection.name) {
                entity[attribute].json = json[attribute]
                continue
            }

            // Date
            if (className === Date.name) {
                entity[attribute] = new Date(json[attribute])
                continue
            }

            // Other Types
            const type = typeof (entity[attribute])

            // non primitive type
            if (type === 'object') {
                entity[attribute].json = json[attribute]
                continue
            }

            // primitive type
            // try to write the property
            try {
                entity[attribute] = json[attribute]
            } catch (e) {
                // it ignores when it's not possible to write (not writable or only a getter)
            }
        }
    }

    /**
     * it considers a private attribute the ones initiated with underscore char.
     * @param attributeName
     * @returns
     */
    private static isPrivateAttribute(attributeName: string): Boolean {
        return attributeName.substring(0, 1) === '_'
    }
}

export default EntityUtil
