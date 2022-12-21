import {Predicate, UserFilter} from "../queries/filter.js";
import {Gender, User} from "../user/types.js";
import {filter} from "./init.js";
import {fillGridWithTeachers} from "./teachers_grid.js";

export function initFilters() {
    getInputFor("age").addEventListener("change", (event: Event) => {
        const selectedAge = (event.target as HTMLInputElement).value;

        const limits: string[] = selectedAge.split("-");
        const min: number = parseInt(limits[0]);
        const max: number = parseInt(limits[1]);

        addEventListenerToFilter(UserFilter.userFilters.byAge(min, max), selectedAge);
    });

    getInputFor("region").addEventListener("change", (event: Event) => {
        const selectedRegion = (event.target as HTMLInputElement).value;

        addEventListenerToFilter(UserFilter.userFilters.byRegion(selectedRegion), selectedRegion);
    });

    getInputFor("sex").addEventListener("change", (event: Event) => {
        const selectedSex: Gender = (event.target as HTMLInputElement).value as Gender;

        addEventListenerToFilter(UserFilter.userFilters.byGender(selectedSex), selectedSex.toString());
    });

    getInputFor("with_photo").addEventListener("change", (event: Event) => {
        const onlyWithPhoto: boolean = (event.target as HTMLInputElement).checked;

        addEventListenerToFilter(UserFilter.userFilters.withPhoto(), onlyWithPhoto);
    });

    getInputFor("favourites").addEventListener("change", (event: Event) => {
        const onlyFavorites: boolean = (event.target as HTMLInputElement).checked;

        addEventListenerToFilter(UserFilter.userFilters.favourites(), onlyFavorites);
    });
}

function addEventListenerToFilter(specificFilter: Predicate<User>, value: string | boolean) {
    filter.removeFilter(specificFilter);

    if (value !== "all" && value)
        filter.addFilter(specificFilter);

    fillGridWithTeachers(filter.filtered());
}

function getInputFor(selector: string): HTMLInputElement {
   return document.querySelector<HTMLInputElement>(`.filters .${selector}`);
}
