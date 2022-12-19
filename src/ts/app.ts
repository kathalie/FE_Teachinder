// @ts-ignore
import {randomUserMock, additionalUsers} from "../mock_files/FE4U-Lab3-mock.js";
import {additionalRandomFields, additionalSchema, userSchema} from "./constants/schemas.js";
import {normalize} from "./data_retreiver/retrieve.js";
import {User} from "./user/types.js";
import {UserFilter} from "./filters/filter.js";
import {Search} from "./search/find.js";

const normalized: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema, additionalSchema, ["full_name"]);
console.log(normalized);

//console.log(new UserValidator(normalized[0]).validate());

const filter = new UserFilter(normalized);
console.log(filter.byGender("female").byCountry("United States").filtered());

const search = new Search(normalized);
console.log(search.percentageOfSelected(
    UserFilter.userFilters.byGender("female"),
    UserFilter.userFilters.byCountry("United States")
));


