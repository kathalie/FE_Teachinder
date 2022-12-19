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
    constructor(public schema: object) {
    }

    public applySchemaTo(incomeObject: object): object {
        const res = {};

        for (const key in this.schema) {
            // @ts-ignore
            res[key] = this.schema[key](incomeObject);
        }

        return res;
    }

    public fitSchema(incomeObject: object) {
        for (const key in this.schema) {
            if (!Object.keys(incomeObject).find(el => el == key)) {
                // @ts-ignore
                incomeObject[key] = null;
            }
        }
    }

    public retrieveFrom(incomeObjects: object[]): object[] {
        const res: object[] = [];

        for (const incomeObject of incomeObjects) {
            res.push(this.applySchemaTo(incomeObject));
        }

        return res;
    }

    public addFieldsToSchema(fields: object): void {
        Object.assign(this.schema, fields);
    }

    private static calculate(obj: object): object {
        const res = {};

        for (const key in obj) {
            // @ts-ignore
            res[key] = obj[key]();
        }

        return res;
    }

    public extendEach(merged: object[], merger: object): object[] {
        const res = [];

        for (const obj of merged) {
            res.push(Object.assign({...obj}, DataRetriever.calculate(merger)));
        }

        return res;
    }

    private find(obj: object, objects: object[], byFields: string[]): object | undefined {
        return objects.find(
            element => byFields.every(
                // @ts-ignore
                field => element[field] === obj[field]
            )
        );
    }

    public merge(merged: object[], merger: object[], byFields: string[]): void {
        for (const objToAdd of merger) {
            let found: object | undefined = this.find(objToAdd, merged, byFields);

            if (!found) {
                //console.log("UNIQUE: " + obj.full_name)
                this.fitSchema(objToAdd);
                merged.push(objToAdd);
            } else {
                this.fitSchema(found);

                for (const key in found)
                    // @ts-ignore
                    found[key] = objToAdd[key] ? objToAdd[key] : found[key];
            }
        }
    }

}
