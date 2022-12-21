import { users } from "./load_users.js";
export function fillGridWithTeachers() {
    const allTeachersGrid = document.querySelector(".all_teachers");
    for (const user of users) {
        const article = document.createElement("article");
        article.setAttribute("class", "profile_card");
        article.innerHTML =
            `<div class="profile_photo">
             <img src="${user.picture_large}" alt="${user.full_name}">
             </div>
             <h3>${user.full_name}</h3>
             <p class="subject">${user.course}</p>
             <p class="country">${user.country}</p>
             <span class="star">${user.favorite ? "★" : ""}</span>`;
        article.setAttribute("data-id", user.id);
        allTeachersGrid.appendChild(article);
    }
}
//# sourceMappingURL=teacher_profile.js.map