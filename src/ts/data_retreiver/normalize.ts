export class Normalizer {
    constructor(public schemaGetter: (object) => object) {
    }

    public applySchemaTo(incomeObject: object): object {
        const res = {};
        const schema = this.schemaGetter(incomeObject);

        for (const key in schema) {
            // @ts-ignore
            res[key] = schema[key];
        }

        return res;
    }

    public normalizeAll(incomeObjects: object[]): object[] {
        const res: object[] = [];

        for (const incomeObject of incomeObjects) {
            res.push(this.applySchemaTo(incomeObject));
        }

        return res;
    }
}
