import { toggleHidden } from "./common.js";
export function initCloseButtons() {
    const closeButtons = document.querySelectorAll(".close");
    for (const closeButton of closeButtons) {
        closeButton.addEventListener("click", (event) => {
            toggleHidden(event.target.closest(".popup"));
        });
    }
}
//# sourceMappingURL=close_button.js.map