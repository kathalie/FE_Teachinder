import { toggleHidden } from "./common/common.js";
import { search } from "./init.js";
import { showTeacherCardPopup } from "./popups/teacher_card_popup.js";
import { showAddTeacherPopup } from "./popups/add_teacher_popup.js";
export function initButtons() {
    initCloseButtons();
    initSearch();
    initAddTeacherButton();
}
function initCloseButtons() {
    const closeButtons = document.querySelectorAll(".close");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (event) => {
            toggleHidden(event.target.closest(".popup"));
        });
    }
}
function initSearch() {
    const searchButton = document.querySelector(".search button");
    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        const input = document.querySelector(".search input");
        const searchQuery = input.value;
        if (!searchQuery)
            return;
        const foundUser = search.find(searchQuery);
        showTeacherCardPopup(foundUser);
        input.value = "";
    });
}
function initAddTeacherButton() {
    const addButtons = document.querySelectorAll(".add_teacher");
    for (const addButton of addButtons) {
        addButton.addEventListener("click", (event) => {
            showAddTeacherPopup();
        });
    }
}
//# sourceMappingURL=buttons.js.map