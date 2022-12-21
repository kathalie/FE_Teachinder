export class Search {
    users;
    constructor(users) {
        this.users = users;
    }
    find(by) {
        if (Number.isInteger(parseInt(by)))
            return this.users.find(user => user.age === parseInt(by));
        const foundByName = this.users.find(user => user.full_name.toLowerCase().includes(by.toLowerCase()));
        if (foundByName)
            return foundByName;
        return this.users.find(user => user.note.toLowerCase().includes(by.toLowerCase()));
    }
    findBy(field, value) {
        return this.users.find(user => user[field].toString().toLowerCase() == value.toString().toLowerCase());
    }
    percentageOfSelected(...by) {
        const nAll = this.users.length;
        const nSpecific = this.users.filter(user => by.every(filter => filter(user))).length;
        return nSpecific / nAll * 100;
    }
}
//# sourceMappingURL=search.js.map