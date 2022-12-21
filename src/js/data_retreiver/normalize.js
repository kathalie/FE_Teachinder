export class Normalizer {
    schemaGetter;
    constructor(schemaGetter) {
        this.schemaGetter = schemaGetter;
    }
    applySchemaTo(incomeObject) {
        const res = {};
        const schema = this.schemaGetter(incomeObject);
        for (const key in schema) {
            // @ts-ignore
            res[key] = schema[key];
        }
        return res;
    }
    normalizeAll(incomeObjects) {
        const res = [];
        for (const incomeObject of incomeObjects) {
            res.push(this.applySchemaTo(incomeObject));
        }
        return res;
    }
}
//# sourceMappingURL=normalize.js.map