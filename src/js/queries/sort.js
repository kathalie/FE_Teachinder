const generalComparators = {
    compareStrings: (el1, el2) => el1.localeCompare(el2),
    compareNumbers: (el1, el2) => el1 - el2
};
export var SortOrder;
(function (SortOrder) {
    SortOrder[SortOrder["ascending"] = 0] = "ascending";
    SortOrder[SortOrder["descending"] = 1] = "descending";
})(SortOrder || (SortOrder = {}));
export class Sort {
    previousArray;
    constructor(previousArray) {
        this.previousArray = previousArray;
    }
    sorted(array, comparator, order = SortOrder.ascending) {
        const arrayCopy = [...array];
        arrayCopy.sort(order === SortOrder.descending ? (el1, el2) => comparator(el2, el1) : comparator);
        this.previousArray = arrayCopy;
        return arrayCopy;
    }
    getLastSorted() {
        return this.previousArray;
    }
}
export const UserComparators = {
    byName: (user1, user2) => generalComparators.compareStrings(user1.full_name, user2.full_name),
    byAge: (user1, user2) => generalComparators.compareNumbers(user1.age, user2.age),
    byBday: (user1, user2) => generalComparators.compareStrings(user1.b_day, user2.b_day),
    byCountry: (user1, user2) => generalComparators.compareStrings(user1.country, user2.country),
    byCourse: (user1, user2) => generalComparators.compareStrings(user1.course, user2.course),
    byGender: (user1, user2) => generalComparators.compareStrings(user1.gender.toString(), user2.gender.toString())
};
//# sourceMappingURL=sort.js.map