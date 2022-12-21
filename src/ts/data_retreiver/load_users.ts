import {Normalizer} from "./normalize.js";
import {userSchema} from "../constants/schemas.js";
import {User} from "../user/types.js";
import {users} from "../dom/init.js";

const normalizer = new Normalizer(userSchema);
const serverUrl = `http://localhost:3000/users`;

export const additionalUsers: number = 10;

export async function getMockUsers(n: number): Promise<User[]> {
    const apiUrl = `https://randomuser.me/api/?results=${n}`;

    return await fetch(apiUrl, {
        method: "GET",
    })
        .then(res => res.json())
        .then(json => json.results as object[])
        .then(users => users.map(user => normalizer.applySchemaTo(user) as User))
        .catch(err => {
            console.log("Fetch error:\n", err);

            return [];
        });
}

export async function getSavedUsers(): Promise<User[]> {
    return await fetch(serverUrl, {
        method: "GET",
    })
        .then(res => res.json())
        .then(json => json as object[])
        .then(users => users.map(user => user as User))
        .catch(err => {
            console.log("Fetch error:\n", err);

            return [];
        });
}

export async function saveNewUser(user: User) {
    await fetch(serverUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });
}

export async function addMockUsers(n: number) {
    const mockUsers = await getMockUsers(n);

    for (const user of mockUsers) {
        users.push(user);
    }
}
