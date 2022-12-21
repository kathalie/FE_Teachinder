export function getUsersForPage(page, usersPerPage, users) {
    const lastPage = getLastPage(usersPerPage, users);
    if (page < 1 || page > lastPage)
        return undefined;
    const firstIndex = usersPerPage * (page - 1);
    const lastIndex = Math.min(firstIndex + usersPerPage, users.length);
    return users.slice(firstIndex, lastIndex);
}
export function getLastPage(usersPerPage, users) {
    return Math.ceil(users.length / usersPerPage);
}
//# sourceMappingURL=slicer.js.map