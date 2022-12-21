import { getRBValue, placePopup, toggleHidden } from "../common/common.js";
import { countries } from "../../constants/countries.js";
import { courses } from "../../user/types.js";
import { filter, users } from "../init.js";
import { UserValidator } from "../../user/validator.js";
import { fillGridWithTeachers } from "../teachers_grid.js";
import { randomId } from "../../random.js";
import { saveNewUser } from "../../data_retreiver/load_users.js";
const addTeacherPopup = document.querySelector(".popup_add_teacher");
export function showAddTeacherPopup() {
    placePopup(addTeacherPopup);
    toggleHidden(addTeacherPopup);
}
export function initAddTeacherPopup() {
    initSelect(".country", countries());
    initSelect(".course", courses);
    initSubmitNewTeacher();
}
function initSelect(selector, options) {
    const select = addTeacherPopup.querySelector(selector);
    for (const optionText of options) {
        const option = document.createElement("option");
        option.innerText = optionText;
        option.setAttribute("value", optionText);
        select.appendChild(option);
    }
}
export function initSubmitNewTeacher() {
    const submitButton = document.querySelector(".popup_add_teacher .add");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const newUser = newValidUser();
        if (!newUser) {
            alert("Some fields were incorrectly filled");
            return;
        }
        saveNewUser(newUser);
        users.push(newUser);
        fillGridWithTeachers(filter.filtered());
        toggleHidden(addTeacherPopup);
    });
}
function newValidUser() {
    const textAndSelectInputs = {
        name: (user, value) => user.full_name = value,
        country: (user, value) => user.country = value,
        city: (user, value) => user.city = value,
        email: (user, value) => user.email = value,
        phone: (user, value) => user.phone = value,
        bday: (user, value) => user.b_day = value,
        bg_color: (user, value) => user.bg_color = value,
        comment: (user, value) => user.note = value,
        course: (user, value) => user.course = value,
    };
    const radioButtons = (user, value) => user.gender = value;
    const user = {};
    const addTeacherPopup = document.querySelector(".popup_add_teacher");
    for (const key in textAndSelectInputs) {
        const value = addTeacherPopup.querySelector(`.${key}`).value;
        textAndSelectInputs[key](user, value);
    }
    radioButtons(user, getRBValue("sex"));
    const b_day = new Date(user.b_day);
    user.age = getAge(b_day);
    user.b_day = b_day.toISOString();
    user.id = randomId(10);
    user.favorite = false;
    const isValid = new UserValidator(user).validate().isValid();
    // @ts-ignore
    return isValid ? user : undefined;
}
function getAge(b_day) {
    return Math.abs(1970 - new Date(new Date().getTime() - b_day.getTime()).getUTCFullYear());
}
//# sourceMappingURL=add_teacher_popup.js.map