import { validatedUsers } from "../user/validator.js";
import { Search } from "../queries/search.js";
import { UserFilter } from "../queries/filter.js";
import { Sort } from "../queries/sort.js";
import { getMockUsers, getSavedUsers } from "../data_retreiver/load_users.js";
//const normalizedUsers: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema,
// additionalSchema, ["full_name"]);
export let users;
export let search;
export let filter;
export let sort;
export async function init() {
    const initialUsers = 50;
    const normalizedUsers = await getMockUsers(initialUsers);
    const savedUsers = await getSavedUsers();
    users = savedUsers.concat(validatedUsers(normalizedUsers));
    console.log(users);
    search = new Search(users);
    filter = new UserFilter(users);
    sort = new Sort(users);
}
//# sourceMappingURL=init.js.map