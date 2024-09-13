import Entity from "./Entity"

class EntityUtil {
    // --------------------------------------
    // populateJSONWithEntity
    // --------------------------------------
    static populateJSONWithEntity(entity: Entity, json: any, toPersistence: boolean = false) {
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

            const className = entity[attribute].constructor.name

            const type = typeof (entity[attribute])

            switch (type) {
                case 'function':
                    break

                case 'object':
                    json[attribute] = toPersistence ? entity[attribute].persistentJSON : entity[attribute].json
                    break

                default:
                    json[attribute] = entity[attribute]
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
