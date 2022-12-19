// @ts-ignore
import {additionalUsers, randomUserMock} from "../mock_files/FE4U-Lab3-mock.js";
import {additionalRandomFields, additionalSchema, userSchema} from "./constants/schemas.js";
import {normalize} from "./data_retreiver/retrieve.js";
import {User} from "./user/types.js";
import {UserFilter} from "./filters/filter.js";
import {Search} from "./search/find.js";
import {sorted, SortOrder, userComparators} from "./sort/sort.js";
import {validatedUsers} from "./user/validator.js";

const normalized: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema, additionalSchema, ["full_name"]);
console.log(normalized);

const validated = validatedUsers(normalized);
console.log(validated);

console.log("Females from US:");
const filter = new UserFilter(validated);
console.log(filter.byGender("female").byCountry("United States").filtered());

console.log("Percentage of females from US:");
const search = new Search(validated);
console.log(search.percentageOfSelected(
    UserFilter.userFilters.byGender("female"),
    UserFilter.userFilters.byCountry("United States")
));

console.log("Teachers whose age is 46:");
console.log(search.find(46));
console.log("Teachers whose name is Olivia:");
console.log(search.find("olivia"));
console.log("Teachers whose name is Norbert:");
console.log(search.find("Norbert"));

function displayUsers(array: User[]) {
    for (const user of array) {
        console.log(`${user.full_name} : ${user.age} : ${user.country} : ${user.b_day}`);
    }
}

console.log("\nBy country:")
displayUsers(sorted<User>(validated, userComparators.byCountry));
console.log("\nBy age:")
displayUsers(sorted<User>(validated, userComparators.byAge));
console.log("\nBy b-day (descending):")
displayUsers(sorted<User>(validated, userComparators.byBday, SortOrder.descending));
console.log("\nBy name:")
displayUsers(sorted<User>(validated, userComparators.byName));
