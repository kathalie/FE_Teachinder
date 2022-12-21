import {User} from "../../user/types.js";
import {
    fillAnchorElement,
    fillImgElement,
    getHTMLElement, placePopup,
    setText,
    toggleHidden
} from "../common/common.js";
import {emptyStar, favoritesContainer, filledStar} from "../common/constants.js";
import {filter, search} from "../init.js";
import {fillGridWithTeachers} from "../teachers_grid.js";
import {createTeacherSmallCard, findTeacherCard} from "../teacher_small_card.js";

const starButton = document.querySelector<HTMLButtonElement>(".teacher_info .star");

export function showTeacherCardPopup(user: User | undefined) {
    if (!user) {
        toggleHidden(document.querySelector(".popup_nothing_was_found"));
        return;
    }

    const teacherCardPopup = document.querySelector<HTMLElement>(".popup_teacher_card");

    placePopup(teacherCardPopup);
    toggleHidden(teacherCardPopup);
    fillTeacherCardPopup(user, teacherCardPopup);
}

function fillTeacherCardPopup(user: User | undefined, teacherCardPopup: HTMLElement) {
    teacherCardPopup.setAttribute("data-id", user.id);

    const classesToUserFields = {
        ".name": user.full_name,
        ".speciality": user.course,
        ".age": user.age.toString(),
        ".sex": user.gender,
        ".city": user.city,
        ".country": user.country,
        ".comment": user.note
    }

    for (const key in classesToUserFields) {
        setText(getHTMLElement(teacherCardPopup, key), classesToUserFields[key]);
    }

    fillAnchorElement(teacherCardPopup, ".email a", `mailto:${user.email}`, user.email);
    fillAnchorElement(teacherCardPopup, ".tel a", `tel:${user.phone}`, user.phone);
    fillImgElement(teacherCardPopup, "img", user.picture_large, `${user.full_name}'s profile photo`);
    if (user.coordinates)
        teacherCardPopup.querySelector("iframe").src =
            `https://maps.google.com/maps?q=${user.coordinates.latitude},${user.coordinates.longitude}&hl=es&z=14&output=embed`;
    toggleButtonStar(starButton, user);
}

export function initFavButton() {
    const popup = document.querySelector<HTMLElement>(".popup_teacher_card");

    starButton.addEventListener("click", (event: Event) => {
        const selectedUser = search.findBy("id", popup.dataset.id);

        selectedUser.favorite = !selectedUser.favorite;
        toggleButtonStar(starButton, selectedUser);
        editFavourites(selectedUser);

        fillGridWithTeachers(filter.filtered());
    });
}

function toggleButtonStar(star: HTMLButtonElement, user: User) {
    star.innerText = user.favorite ? filledStar : emptyStar;
}

function editFavourites(user: User) {
    if (user.favorite) {
        favoritesContainer.appendChild(createTeacherSmallCard(user, false));
    } else {
        favoritesContainer.removeChild(findTeacherCard(user.id));
    }
}
