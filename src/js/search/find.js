export class Search {
    users;
    constructor(users) {
        this.users = users;
    }
    find(by) {
        if (typeof by === "number")
            return this.users.find(user => user.age === by);
        const foundByName = this.users.find(user => user.full_name.toLowerCase().includes(by.toLowerCase()));
        if (foundByName)
            return foundByName;
        return this.users.find(user => user.note.toLowerCase().includes(by.toLowerCase()));
    }
    percentageOfSelected(...by) {
        const nAll = this.users.length;
        const nSpecific = this.users.filter(user => by.every(filter => filter(user))).length;
        return nSpecific / nAll * 100;
    }
}
//# sourceMappingURL=find.js.map