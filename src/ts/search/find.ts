import {User} from "../user/types.js";
import {Predicate} from "../filters/filter.js";

export class Search {
    constructor(private users: User[]) {
    }

    public find(by: string | number): User {
        if (typeof by === "number")
            return this.users.find(user => user.age === by);

        const foundByName = this.users.find(user => user.full_name.toLowerCase().includes(by.toLowerCase()));
        if (foundByName)
            return foundByName;

        return this.users.find(user => user.note.toLowerCase().includes(by.toLowerCase()));
    }

    public percentageOfSelected(...by: Predicate<User>[]): number {
        const nAll = this.users.length;
        const nSpecific = this.users.filter(user => by.every(filter => filter(user))).length;

        return nSpecific / nAll * 100;
    }
}
