import { validatedUsers } from "../user/validator.js";
import { Search } from "../queries/search.js";
import { UserFilter } from "../queries/filter.js";
import { Sort } from "../queries/sort.js";
import { getMockUsers, getSavedUsers } from "../data_retreiver/load_users.js";
//const normalizedUsers: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema,
// additionalSchema, ["full_name"]);
const initialUsers = 50;
const normalizedUsers = await getMockUsers(initialUsers);
const savedUsers = await getSavedUsers();
export const users = savedUsers.concat(validatedUsers(normalizedUsers));
console.log(users);
export const search = new Search(users);
export const filter = new UserFilter(users);
export const sort = new Sort(users);
//# sourceMappingURL=init.js.map