import {User} from "../user/types.js";

// Сортування може бути як за зростанням так і за спаданням.
//     Сортуватись можуть чисельні поля та строкові: full_name, age, b_day, country.
//     Сортування працює по одному парамету (логічне «або»)

type Comparator<T> = (el1: T, el2: T) => number;

const generalComparators = {
    compareStrings: (el1: string, el2: string) => el1.localeCompare(el2),
    compareNumbers: (el1: number, el2: number) => el1 - el2
}

export const userComparators = {
    byName: (user1: User, user2: User) => generalComparators.compareStrings(user1.full_name, user2.full_name),
    byAge: (user1: User, user2: User) => generalComparators.compareNumbers(user1.age, user2.age),
    byBday: (user1: User, user2: User) => generalComparators.compareStrings(user1.b_day, user2.b_day),
    byCountry: (user1: User, user2: User) => generalComparators.compareStrings(user1.country, user2.country)
}

export enum SortOrder {
    ascending, descending
}

export function sorted<T>(array: T[], comparator: Comparator<T>, order: SortOrder = SortOrder.ascending) {
    const arrayCopy = [...array];

    if (order === SortOrder.descending)
        comparator = (el1, el2) => comparator(el2, el1);

    arrayCopy.sort(comparator);

    return arrayCopy;
}
