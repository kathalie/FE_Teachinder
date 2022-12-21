import { search } from "./load_users.js";
import { showTeacherCardPopup } from "./popups/teacher_card_popup.js";
import { favoritesContainer, filledStar } from "./common/constants.js";
export function createTeacherSmallCard(user, setStar) {
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
    article.querySelector(".profile_photo").style.backgroundColor = user.bg_color ? user.bg_color : "#ffffff";
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
function getInitials(fullName) {
    const partsOfWord = fullName.split(" ");
    const initials = partsOfWord.map(part => `${part.charAt(0)}.`);
    return initials.join("");
}
export function addTeacherCardsListener(container) {
    container.addEventListener("click", (event) => {
        const profilePhoto = event.target.closest(".profile_photo");
        if (!profilePhoto)
            return;
        if (!container.contains(profilePhoto))
            return;
        const profileCard = event.target.closest(".profile_card");
        const id = profileCard.dataset.id;
        const user = search.findBy("id", id);
        showTeacherCardPopup(user);
    });
}
export function findTeacherCard(id) {
    return favoritesContainer.querySelector(`article[data-id="${id}"]`);
}
//# sourceMappingURL=teacher_small_card.js.map