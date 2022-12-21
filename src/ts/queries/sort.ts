import {User} from "../user/types.js";

// Сортування може бути як за зростанням так і за спаданням.
//     Сортуватись можуть чисельні поля та строкові: full_name, age, b_day, country.
//     Сортування працює по одному парамету (логічне «або»)

type Comparator<T> = (el1: T, el2: T) => number;

const generalComparators = {
    compareStrings: (el1: string, el2: string) => el1.localeCompare(el2),
    compareNumbers: (el1: number, el2: number) => el1 - el2
}

export enum SortOrder {
    ascending, descending
}

export class Sort<T> {
    private lastComparator: Comparator<T>;
    private lastOrder: SortOrder;

    constructor(private previousArray: T[]) {
    }

    public sorted(array: T[], comparator: Comparator<T>, order: SortOrder = SortOrder.ascending) {
        const arrayCopy = [...array];

        arrayCopy.sort(order === SortOrder.descending ? (el1, el2) => comparator(el2, el1) : comparator);

        this.previousArray = arrayCopy;
        this.lastComparator = comparator;
        this.lastOrder = order;

        return arrayCopy;
    }

    public sortedByLastComparator(array: T[]) {
        if (!this.lastComparator || !this.lastOrder)
            return array;

        return this.sorted(array, this.lastComparator, this.lastOrder);
    }

    public getLastSorted() {
        return this.previousArray;
    }
}

export const UserComparators = {
    byName: (user1: User, user2: User) => generalComparators.compareStrings(user1.full_name, user2.full_name),
    byAge: (user1: User, user2: User) => generalComparators.compareNumbers(user1.age, user2.age),
    byBday: (user1: User, user2: User) => generalComparators.compareStrings(user1.b_day, user2.b_day),
    byCountry: (user1: User, user2: User) => generalComparators.compareStrings(user1.country, user2.country),
    byCourse: (user1: User, user2: User) => generalComparators.compareStrings(user1.course, user2.course),
    byGender: (user1: User, user2: User) => generalComparators.compareStrings(user1.gender.toString(), user2.gender.toString())
}
