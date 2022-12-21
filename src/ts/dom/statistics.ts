import {User} from "../user/types.js";
import {sort, users} from "./init.js";
import {SortOrder, UserComparators} from "../queries/sort.js";
import {getUsersForPage} from "../queries/slicer.js";
import {usersPerPage} from "./common/constants.js";
import {getCurrentPage} from "./pagination.js";

export function fillStatisticsTable(users: User[], page: number) {
    const fields = {
        name: (user: User) => user.full_name,
        speciality: (user: User) => user.course,
        age: (user: User) => user.age,
        gender: (user: User) => user.gender,
        nationality: (user: User) => user.country
    }

    const statisticsTable = document.querySelector("table.statistics");
    const sortingRow = document.querySelector(".sorting_row");
    const slicedUsers = getUsersForPage(page, usersPerPage, users);

    statisticsTable.innerHTML = "";
    statisticsTable.appendChild(sortingRow);

    for (const user of slicedUsers) {
        const tr: HTMLElement = document.createElement("tr");

        for (const userField of Object.values(fields)) {
            const td: HTMLElement = document.createElement("td");
            td.innerText = userField(user).toString();
            tr.appendChild(td);
        }

        statisticsTable.appendChild(tr);
    }
}

export function initSorting() {
    const comparators = {
        name: UserComparators.byName,
        course: UserComparators.byCourse,
        age: UserComparators.byAge,
        gender: UserComparators.byGender,
        country: UserComparators.byCountry
    }

    const sortingRow = document.querySelector(".sorting_row");

    sortingRow.addEventListener("click", (event: Event) => {
        const th = (event.target as HTMLElement).closest("th");

        if (!th) return;
        if (!sortingRow.contains(th)) return;

        const classList = th.classList;
        const sortingField: string =
            Object.keys(comparators).find((el) => classList.contains(el));

        const order: SortOrder = classList.contains("ascending") ? SortOrder.ascending : SortOrder.descending;
        classList.toggle("ascending");
        classList.toggle("descending");

        fillStatisticsTable(sort.sorted(users, comparators[sortingField], order), getCurrentPage());
    });
}
