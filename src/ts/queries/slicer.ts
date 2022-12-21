import {User} from "../user/types.js";

export function getUsersForPage(page: number, usersPerPage: number, users: User[]): User[] | undefined {
    const lastPage: number = getLastPage(usersPerPage, users);

    if (page < 1 || page > lastPage) return undefined;

    const firstIndex: number = usersPerPage * (page - 1);
    const lastIndex: number = Math.min(firstIndex + usersPerPage, users.length);

    return users.slice(firstIndex, lastIndex);
}

export function getLastPage(usersPerPage: number, users: User[]): number {
    return Math.ceil(users.length / usersPerPage);
}
