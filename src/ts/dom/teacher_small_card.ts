import {User} from "../user/types.js";
import {search} from "./init.js";
import {showTeacherCardPopup} from "./popups/teacher_card_popup.js";
import {favoritesContainer, filledStar} from "./common/constants.js";

export function createTeacherSmallCard(user: User, setStar: boolean): HTMLElement {
    const article = document.createElement("article");
    article.setAttribute("class", "profile_card");

    article.innerHTML =
        `<div class="profile_photo">
        <img src="${user.picture_large ? user.picture_large : ""}" alt="${getInitials(user.full_name)}">
        </div>
             <h3>${user.full_name}</h3>
             <p class="subject">${user.course}</p>
             <p class="country">${user.country}</p>`;

    // @ts-ignore
    article.querySelector<HTMLElement>(".profile_photo").style.backgroundColor = user.bg_color ? user.bg_color : "#ffffff";

    if (setStar) {
        const spanStar = document.createElement('span');
        spanStar.className = "star";

        if (user.favorite)
            spanStar.innerText = filledStar;

        article.appendChild(spanStar);
    }

    article.setAttribute("data-id", user.id);

    return article;
}

function getInitials(fullName: string) {
    const partsOfWord: string[] = fullName.split(" ");
    const initials = partsOfWord.map(part => `${part.charAt(0)}.`);

    return initials.join("");
}

export function addTeacherCardsListener(container: HTMLElement) {
    container.addEventListener("click", (event: Event) => {
        const profilePhoto = (event.target as HTMLElement).closest(".profile_photo");

        if (!profilePhoto) return;
        if (!container.contains(profilePhoto)) return;

        const profileCard = (event.target as HTMLElement).closest(".profile_card") as HTMLElement;

        const id: string = profileCard.dataset.id;
        const user: User = search.findBy("id", id);

        showTeacherCardPopup(user);
    });
}

export function findTeacherCard(id: string) {
    return favoritesContainer.querySelector<HTMLElement>(`article[data-id="${id}"]`);
}
