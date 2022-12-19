const generalComparators = {
    compareStrings: (el1, el2) => el1.localeCompare(el2),
    compareNumbers: (el1, el2) => el1 - el2
};
export const userComparators = {
    byName: (user1, user2) => generalComparators.compareStrings(user1.full_name, user2.full_name),
    byAge: (user1, user2) => generalComparators.compareNumbers(user1.age, user2.age),
    byBday: (user1, user2) => generalComparators.compareStrings(user1.b_day, user2.b_day),
    byCountry: (user1, user2) => generalComparators.compareStrings(user1.country, user2.country)
};
export var SortOrder;
(function (SortOrder) {
    SortOrder[SortOrder["ascending"] = 0] = "ascending";
    SortOrder[SortOrder["descending"] = 1] = "descending";
})(SortOrder || (SortOrder = {}));
export function sorted(array, comparator, order = SortOrder.ascending) {
    const arrayCopy = [...array];
    if (order === SortOrder.descending)
        comparator = (el1, el2) => comparator(el2, el1);
    arrayCopy.sort(comparator);
    return arrayCopy;
}
//# sourceMappingURL=sort.js.map