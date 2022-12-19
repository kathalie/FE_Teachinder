/**
 * {
 *     "gender": "male",
 *     "title": "Mr",
 *     "full_name": "Norbert Weishaupt",
 *     "city": "Rhön-Grabfeld",
 *     "state": "Mecklenburg-Vorpommern",
 *     "country": "Germany",
 *     "postcode": 52640,
 *     "coordinates": { "latitude": "-42.1817", "longitude": "-152.1685" },
 *     "timezone": { "offset": "+9:30", "description": "Adelaide, Darwin" },
 *     "email": "norbert.weishaupt@example.com",
 *     "b_day": "1956-12-23T19:09:19.602Z",
 *     "age": 65,
 *     "phone": "0079-8291509",
 *     "picture_large": "https://randomuser.me/api/portraits/men/28.jpg",
 *     "picture_thumbnail": "https://randomuser.me/api/portraits/thumb/men/28.jpg"
 * }
 */
export class DataRetriever {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    applySchemaTo(incomeObject) {
        const res = {};
        for (const key in this.schema) {
            // @ts-ignore
            res[key] = this.schema[key](incomeObject);
        }
        return res;
    }
    fitSchema(incomeObject) {
        for (const key in this.schema) {
            if (!Object.keys(incomeObject).find(el => el == key)) {
                // @ts-ignore
                incomeObject[key] = null;
            }
        }
    }
    retrieveFrom(incomeObjects) {
        const res = [];
        for (const incomeObject of incomeObjects) {
            res.push(this.applySchemaTo(incomeObject));
        }
        return res;
    }
    addFieldsToSchema(fields) {
        Object.assign(this.schema, fields);
    }
    static calculate(obj) {
        const res = {};
        for (const key in obj) {
            // @ts-ignore
            res[key] = obj[key]();
        }
        return res;
    }
    extendEach(merged, merger) {
        const res = [];
        for (const obj of merged) {
            res.push(Object.assign({ ...obj }, DataRetriever.calculate(merger)));
        }
        return res;
    }
    find(obj, objects, byFields) {
        return objects.find(element => byFields.every(
        // @ts-ignore
        field => element[field] === obj[field]));
    }
    merge(merged, merger, byFields) {
        for (const objToAdd of merger) {
            let found = this.find(objToAdd, merged, byFields);
            if (!found) {
                //console.log("UNIQUE: " + obj.full_name)
                this.fitSchema(objToAdd);
                merged.push(objToAdd);
            }
            else {
                this.fitSchema(found);
                for (const key in found)
                    // @ts-ignore
                    found[key] = objToAdd[key] ? objToAdd[key] : found[key];
            }
        }
    }
}
//# sourceMappingURL=data_retriever.js.map