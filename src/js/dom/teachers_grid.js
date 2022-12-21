import { users } from "./load_users.js";
import { allTeachersGrid } from "./common/constants.js";
import { addTeacherCardsListener, createTeacherSmallCard } from "./teacher_small_card.js";
export function initTeachersGrid() {
    fillGridWithTeachers(users);
    addTeacherCardsListener(allTeachersGrid);
}
export function fillGridWithTeachers(users) {
    allTeachersGrid.innerHTML = "";
    for (const user of users) {
        const card = createTeacherSmallCard(user, true);
        allTeachersGrid.appendChild(card);
    }
}
//# sourceMappingURL=teachers_grid.js.map