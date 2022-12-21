// @ts-ignore
import { additionalUsers, randomUserMock } from "../../mock_files/FE4U-Lab3-mock.js";
import { normalize } from "../data_retreiver/retrieve.js";
import { validatedUsers } from "../user/validator.js";
import { additionalRandomFields, additionalSchema, userSchema } from "../constants/schemas.js";
import { Search } from "../queries/search.js";
import { UserFilter } from "../queries/filter.js";
import { Sort } from "../queries/sort.js";
const normalizedUsers = normalize(randomUserMock, additionalUsers, additionalRandomFields, userSchema, additionalSchema, ["full_name"]);
export const users = validatedUsers(normalizedUsers);
export const search = new Search(users);
export const filter = new UserFilter(users);
export const sort = new Sort(users);
//# sourceMappingURL=load_users.js.map