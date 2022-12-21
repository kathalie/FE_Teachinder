import { UserFilter } from "../queries/filter.js";
import { filter } from "./load_users.js";
import { fillGridWithTeachers } from "./teachers_grid.js";
export function initFilters() {
    getInputFor("age").addEventListener("change", (event) => {
        const selectedAge = event.target.value;
        const limits = selectedAge.split("-");
        const min = parseInt(limits[0]);
        const max = parseInt(limits[1]);
        addEventListenerToFilter(UserFilter.userFilters.byAge(min, max), selectedAge);
    });
    getInputFor("region").addEventListener("change", (event) => {
        const selectedRegion = event.target.value;
        addEventListenerToFilter(UserFilter.userFilters.byRegion(selectedRegion), selectedRegion);
    });
    getInputFor("sex").addEventListener("change", (event) => {
        const selectedSex = event.target.value;
        addEventListenerToFilter(UserFilter.userFilters.byGender(selectedSex), selectedSex.toString());
    });
    getInputFor("with_photo").addEventListener("change", (event) => {
        const onlyWithPhoto = event.target.checked;
        addEventListenerToFilter(UserFilter.userFilters.withPhoto(), onlyWithPhoto);
    });
    getInputFor("favourites").addEventListener("change", (event) => {
        const onlyFavorites = event.target.checked;
        addEventListenerToFilter(UserFilter.userFilters.favourites(), onlyFavorites);
    });
}
function addEventListenerToFilter(specificFilter, value) {
    filter.removeFilter(specificFilter);
    if (value !== "all" && value)
        filter.addFilter(specificFilter);
    fillGridWithTeachers(filter.filtered());
}
function getInputFor(selector) {
    return document.querySelector(`.filters .${selector}`);
}
//# sourceMappingURL=filters.js.map