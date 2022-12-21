import {toggleHidden} from "./common/common.js";
import {User} from "../user/types.js";
import {search, users} from "./load_users.js";
import {showTeacherCardPopup} from "./popups/teacher_card_popup.js";
import {showAddTeacherPopup} from "./popups/add_teacher_popup.js";
import {UserValidator} from "../user/validator.js";

export function initButtons() {
    initCloseButtons();
    initSearch();
    initAddTeacherButton();
}

function initCloseButtons() {
    const closeButtons: NodeList = document.querySelectorAll<HTMLButtonElement>(".close");

    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (event: Event) => {
            toggleHidden((event.target as HTMLElement).closest(".popup"));
        });
    }
}

function initSearch() {
    const searchButton: HTMLElement = document.querySelector<HTMLButtonElement>(".search button");

    searchButton.addEventListener("click", (event: Event) => {
        event.preventDefault();

        const input = document.querySelector<HTMLInputElement>(".search input");
        const searchQuery: string = input.value;

        if (!searchQuery) return;

        const foundUser: User | undefined = search.find(searchQuery);

        showTeacherCardPopup(foundUser);
        input.value = "";
    });
}

function initAddTeacherButton() {
    const addButtons: NodeList = document.querySelectorAll<HTMLButtonElement>(".add_teacher");

    for (const addButton of addButtons) {
        addButton.addEventListener("click", (event: Event) => {
            showAddTeacherPopup();
        });
    }
}
