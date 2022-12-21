import { validatedUsers } from "../user/validator.js";
import { Search } from "../queries/search.js";
import { UserFilter } from "../queries/filter.js";
import { Sort } from "../queries/sort.js";
import { Normalizer } from "../data_retreiver/normalize.js";
import { userSchema } from "../constants/schemas.js";
//const normalizedUsers: User[] = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema,
// additionalSchema, ["full_name"]);
const initialUsers = 50;
export const additionalUsers = 10;
const normalizer = new Normalizer(userSchema);
export async function getMockUsers(n) {
    const apiUrl = `https://randomuser.me/api/?results=${n}`;
    return fetch(apiUrl, {
        method: "GET",
    })
        .then(res => res.json())
        .then(json => json.results)
        .then(users => users.map(user => normalizer.applySchemaTo(user)))
        .catch(err => {
        console.log("Fetch error:\n", err);
        return [];
    });
}
const normalizedUsers = await getMockUsers(initialUsers);
export const users = validatedUsers(normalizedUsers);
console.log(users);
export const search = new Search(users);
export const filter = new UserFilter(users);
export const sort = new Sort(users);
//# sourceMappingURL=load_users.js.map