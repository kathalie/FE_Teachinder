// import {User} from "./user/types.js";
// import {UserFilter} from "./filters/filter.js";
// import {Search} from "./search/find.js";
// import {sorted, SortOrder, userComparators} from "./sort/sort.js";
// import {validatedUsers} from "./user/validator.js";
//
// const normalized: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema, additionalSchema, ["full_name"]);
// console.log(normalized);
//
// const validated = validatedUsers(normalized);
// console.log(validated);
//
// console.log("Females from US:");
// const filter = new UserFilter(validated);
// console.log(filter.byGender("female").byCountry("United States").filtered());
//
// console.log("Percentage of females from US:");
// const search = new Search(validated);
// console.log(search.percentageOfSelected(
//     UserFilter.userFilters.byAge(30, 100),
// ));
// console.log(search.percentageOfSelected(
//     UserFilter.userFilters.byAge(0, 29),
// ));
//
// console.log("Teachers whose age is 46:");
// console.log(search.find(46));
// console.log("Teachers whose name is Olivia:");
// console.log(search.find("olivia"));
// console.log("Teachers whose name is Norbert:");
// console.log(search.find("Norbert"));
//
// function displayUsers(array: User[]) {
//     for (const user of array) {
//         console.log(`${user.full_name} : ${user.age} : ${user.country} : ${user.b_day}`);
//     }
// }
//
// console.log("\nBy country:")
// displayUsers(sorted<User>(validated, userComparators.byCountry));
// console.log("\nBy age:")
// displayUsers(sorted<User>(validated, userComparators.byAge));
// console.log("\nBy b-day (descending):")
// displayUsers(sorted<User>(validated, userComparators.byBday, SortOrder.descending));
// console.log("\nBy name:")
// displayUsers(sorted<User>(validated, userComparators.byName));
import { initButtons } from "./dom/buttons.js";
import { initTeachersGrid } from "./dom/teachers_grid.js";
import { initFilters } from "./dom/filters.js";
import { users } from "./dom/init.js";
import { fillStatisticsTable, initSorting } from "./dom/statistics.js";
import { initPagination } from "./dom/pagination.js";
import { initFavorites } from "./dom/favorites.js";
import { initAddTeacherPopup } from "./dom/popups/add_teacher_popup.js";
import { initFavButton } from "./dom/popups/teacher_card_popup.js";
function run() {
    fillStatisticsTable(users, 1);
    initTeachersGrid();
    initFavorites();
    initAddTeacherPopup();
    initFavButton();
    initButtons();
    initFilters();
    initSorting();
    initPagination();
}
run();
//# sourceMappingURL=app.js.map