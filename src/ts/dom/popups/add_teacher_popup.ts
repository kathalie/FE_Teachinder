import {getRBValue, placePopup, toggleHidden} from "../common/common.js";
import {countries} from "../../constants/countries.js";
import {courses, User} from "../../user/types.js";
import {filter, users} from "../load_users.js";
import {UserValidator} from "../../user/validator.js";
import {fillGridWithTeachers} from "../teachers_grid.js";
import {additionalRandomFields} from "../../constants/schemas.js";

const addTeacherPopup = document.querySelector<HTMLElement>(".popup_add_teacher");

export function showAddTeacherPopup() {
    placePopup(addTeacherPopup);
    toggleHidden(addTeacherPopup);
}

export function initAddTeacherPopup() {
    initSelect(".country", countries());
    initSelect(".course", courses);
    initSubmitNewTeacher();
}

function initSelect(selector: string, options: any[]) {
    const select = addTeacherPopup.querySelector(selector);

    for (const optionText of options) {
        const option = document.createElement("option");
        option.innerText = optionText;
        option.setAttribute("value", optionText);

        select.appendChild(option);
    }
}

export function initSubmitNewTeacher() {
    const submitButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".popup_add_teacher .add");

    submitButton.addEventListener("click", (event: Event) => {
        event.preventDefault();

        const newUser: User = newValidUser();

        if (!newUser) {
            alert("Some fields were incorrectly filled");
            return;
        }

        users.push(newUser);
        fillGridWithTeachers(filter.filtered());

        toggleHidden(addTeacherPopup);
    });
}

function newValidUser(): User | undefined {
    const textAndSelectInputs = {
        name: (user: User, value) => user.full_name = value,
        country: (user: User, value) => user.country = value,
        city: (user: User, value) => user.city = value,
        email: (user: User, value) => user.email = value,
        phone: (user: User, value) => user.phone = value,
        bday: (user: User, value) => user.b_day = value,
        bg_color: (user: User, value) => user.bg_color = value,
        comment: (user: User, value) => user.note = value,
        course: (user: User, value) => user.course = value,
    }

    const radioButtons = (user: User, value) => user.gender = value;

    const user: User = {} as User;

    const addTeacherPopup = document.querySelector(".popup_add_teacher");

    for (const key in textAndSelectInputs) {
        const value = addTeacherPopup.querySelector<HTMLInputElement>(`.${key}`).value;
        textAndSelectInputs[key](user, value);
    }

    radioButtons(user, getRBValue("sex"));
    const b_day: Date = new Date(user.b_day);
    user.age = getAge(b_day);
    user.b_day = b_day.toISOString();
    user.id = additionalRandomFields.id();
    user.favorite = false;

    const isValid: boolean = new UserValidator(user).validate().isValid();

    // @ts-ignore
    return isValid ? user : undefined;
}

function getAge(b_day: Date): number {
    return Math.abs(1970 - new Date(new Date().getTime() - b_day.getTime()).getUTCFullYear());
}
