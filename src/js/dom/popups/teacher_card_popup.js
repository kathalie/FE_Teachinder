import * as L from "leaflet";
import { fillAnchorElement, fillImgElement, getHTMLElement, placePopup, setText, toggleHidden } from "../common/common.js";
import { emptyStar, favoritesContainer, filledStar } from "../common/constants.js";
import { filter, search } from "../init.js";
import { fillGridWithTeachers } from "../teachers_grid.js";
import { createTeacherSmallCard, findTeacherCard } from "../teacher_small_card.js";
const starButton = document.querySelector(".teacher_info .star");
export function showTeacherCardPopup(user) {
    if (!user) {
        toggleHidden(document.querySelector(".popup_nothing_was_found"));
        return;
    }
    const teacherCardPopup = document.querySelector(".popup_teacher_card");
    placePopup(teacherCardPopup);
    toggleHidden(teacherCardPopup);
    fillTeacherCardPopup(user, teacherCardPopup);
}
function fillTeacherCardPopup(user, teacherCardPopup) {
    teacherCardPopup.setAttribute("data-id", user.id);
    const classesToUserFields = {
        ".name": user.full_name,
        ".speciality": user.course,
        ".age": user.age.toString(),
        ".sex": user.gender,
        ".city": user.city,
        ".country": user.country,
        ".comment": user.note
    };
    for (const key in classesToUserFields) {
        setText(getHTMLElement(teacherCardPopup, key), classesToUserFields[key]);
    }
    fillAnchorElement(teacherCardPopup, ".email a", `mailto:${user.email}`, user.email);
    fillAnchorElement(teacherCardPopup, ".tel a", `tel:${user.phone}`, user.phone);
    fillImgElement(teacherCardPopup, "img", user.picture_large, `${user.full_name}'s profile photo`);
    if (user.coordinates) {
        // teacherCardPopup.querySelector("iframe").src =
        //     `https://maps.google.com/maps?q=${user.coordinates.latitude},${user.coordinates.longitude}&hl=es&z=14&output=embed`;
        createMap(user);
    }
    toggleButtonStar(starButton, user);
}
function createMap(user) {
    const map = L.map("map");
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([user.coordinates.latitude, user.coordinates.longitude]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}
export function initFavButton() {
    const popup = document.querySelector(".popup_teacher_card");
    starButton.addEventListener("click", (event) => {
        const selectedUser = search.findBy("id", popup.dataset.id);
        selectedUser.favorite = !selectedUser.favorite;
        toggleButtonStar(starButton, selectedUser);
        editFavourites(selectedUser);
        fillGridWithTeachers(filter.filtered());
    });
}
function toggleButtonStar(star, user) {
    star.innerText = user.favorite ? filledStar : emptyStar;
}
function editFavourites(user) {
    if (user.favorite) {
        favoritesContainer.appendChild(createTeacherSmallCard(user, false));
    }
    else {
        favoritesContainer.removeChild(findTeacherCard(user.id));
    }
}
//# sourceMappingURL=teacher_card_popup.js.map