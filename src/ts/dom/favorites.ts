import {addTeacherCardsListener, createTeacherSmallCard} from "./teacher_small_card.js";
import {UserFilter} from "../queries/filter.js";
import {users} from "./load_users.js";
import {favoritesContainer} from "./common/constants.js";

export function initFavorites() {
    const favoriteTeachers = new UserFilter(users).addFilter(UserFilter.userFilters.favourites()).filtered();

    for (const user of favoriteTeachers) {
        const card = createTeacherSmallCard(user, false);
        favoritesContainer.appendChild(card);
    }

    addTeacherCardsListener(favoritesContainer);
    addCarouselMoveListeners();
}

function addCarouselMoveListeners() {
    const cards = document.querySelector<HTMLElement>(".favorites_cards");
    const width = parseFloat(getComputedStyle(cards.querySelector("article")).width);

    addCarouselMoveListener(".right_arrow", width, cards);
    addCarouselMoveListener(".left_arrow", -width, cards);
}

function addCarouselMoveListener(selector: string, shift: number, cards: HTMLElement) {
    const nextCard = document.querySelector(selector);

    nextCard.addEventListener("click", () => {
        cards.scrollBy({left: shift, behavior: 'smooth'})
    });
}
