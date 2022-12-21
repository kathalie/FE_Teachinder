import { getLastPage } from "../queries/slicer.js";
import { usersPerPage } from "./common/constants.js";
import { filter, sort, users } from "./init.js";
import { fillStatisticsTable } from "./statistics.js";
import { fillGridWithTeachers } from "./teachers_grid.js";
const pagination = document.querySelector(".statistics_pagination");
export function initPagination() {
    fillPagination(1);
    addPaginationEventListener();
}
function addPaginationEventListener() {
    pagination.addEventListener("click", async (event) => {
        const a = event.target.closest("a");
        if (!a)
            return;
        if (!pagination.contains(a))
            return;
        const currentPage = parseInt(a.innerHTML);
        // if (getLastPage(usersPerPage, users) - currentPage <= 2) {
        //     addMockUsers(additionalUsers).then(() => {
        //         fillPagination(currentPage);
        //         fillGridWithTeachers(filter.filtered());
        //         fillStatisticsTable(sort.sortedByLastComparator(users), currentPage);
        //         //fillPagination(currentPage); // отут краще абсолютний карент пейдж, а не той, який в даний момент
        //         // буде наступним
        //     });
        // }
        fillPagination(currentPage);
        fillGridWithTeachers(filter.filtered());
        fillStatisticsTable(sort.sortedByLastComparator(users), currentPage);
    });
}
export function fillPagination(currentPage) {
    let lastPage = getLastPage(usersPerPage, users);
    pagination.innerHTML = "";
    const setOfAvailablePages = new Set();
    setOfAvailablePages
        .add(1)
        .add(Math.max(currentPage - 1, 1))
        .add(currentPage)
        .add(Math.min(currentPage + 1, lastPage))
        .add(lastPage);
    fillWithPages(setOfAvailablePages, pagination, currentPage);
    addPaddings([...setOfAvailablePages], pagination);
}
function fillWithPages(setOfAvailablePages, pagination, currentPage) {
    for (const page of setOfAvailablePages) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = page.toString();
        a.href = "#statistics";
        if (page == currentPage)
            a.className = "current";
        li.appendChild(a);
        pagination.appendChild(li);
    }
}
function addPaddings(availablePages, pagination) {
    const padding = document.createElement("li");
    padding.innerText = "...";
    const n = availablePages.length;
    const firstPage = 1;
    const lastPage = availablePages[n - 1];
    const allPagesAnchors = pagination.querySelectorAll("li a");
    if (availablePages[Math.min(n, 2) - 1] - firstPage > 1)
        allPagesAnchors.item(0).parentElement.after(padding);
    if (lastPage - availablePages[Math.max(n - 1, 1) - 1] > 1)
        allPagesAnchors.item(n - 1).parentElement.before(padding.cloneNode(true));
}
export function getCurrentPage() {
    return parseInt(document.querySelector(".statistics_pagination .current").innerText);
}
//# sourceMappingURL=pagination.js.map