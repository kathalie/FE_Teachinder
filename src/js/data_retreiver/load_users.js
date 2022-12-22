import { Normalizer } from "./normalize.js";
import { userSchema } from "../constants/schemas.js";
import { users } from "../dom/init.js";
const normalizer = new Normalizer(userSchema);
const serverUrl = `http://localhost:3000/users`;
export const additionalUsers = 10;
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
export async function getSavedUsers() {
    return fetch(serverUrl, {
        method: "GET",
    })
        .then(res => res.json())
        .then(json => json)
        .then(users => users.map(user => user))
        .catch(err => {
        console.log("Fetch error:\n", err);
        return [];
    });
}
export async function saveNewUser(user) {
    await fetch(serverUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });
}
export async function addMockUsers(n) {
    const mockUsers = await getMockUsers(n);
    for (const user of mockUsers) {
        users.push(user);
    }
}
//# sourceMappingURL=load_users.js.map