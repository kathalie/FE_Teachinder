/**
 *  Поля full_name, gender, note, state, city, country мають бути
 * строками, та починатись з великої літери.
 *  Поле age має бути чисельним.
 *  Поле phone має відповідати заданому формату (формат залежить від
 * країни).
 *  Поле email має відповідати формату запису email, тобто мати @.
 */
import {User} from "./types.js";
import {countries} from "../constants/countries.js";
import {phoneCodes} from "../constants/constants.js";
import {Predicate} from "../filters/filter.js";

export class UserValidator {
    constructor(public user: User) {
    }

    public static validationRules = {
        full_name: (user: User) => user.full_name === "string",
        gender: (user: User) => user.gender === "male" || user.gender === "female",
        note: (user: User) => user.note === "string",
        state: (user: User) => user.state === "string",
        city: (user: User) => user.city === "string",
        country: (user: User) => countries().includes(user.country),
        age: (user: User) => Number.isInteger(user.age) && user.age >= 18 && user.age <= 100,
        phone: (user: User) => /(\(?\+[0-9]{1,3}\)?)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/.test(user.phone),
        email: (user: User) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email),
    }

    public validated(): User {
        const validated: User = {...this.user};

        const fieldsValidation = {
            full_name: () => this.capitalize("full_name"),
            gender: () => this.capitalize("gender"),
            note: () => this.capitalizeFirst("note"),
            state: () => this.capitalize("state"),
            city: () => this.capitalize("city"),
            country: () => this.capitalize("country"),
            age: () => this.number("age"),
            phone: () => this.phone("phone"),
            email: () => this.email("email")
        }

        for (const field in fieldsValidation) {
            validated[field] = fieldsValidation[field](field);
        }

        return validated;
    }

    public isValidBy(validationRule: Predicate<User>): boolean {
        return validationRule(this.user);
    }

    public isValid(field: string): boolean {
        return this.isValidBy(UserValidator.validationRules[field]);
    }


    private capitalizeFirst = (field: string): string | null => {
        if (this.isValid(field)) return null;

        return this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    }

    private capitalize = (field: string): string | null => {
        if (this.isValid(field)) return null;

        return this.user[field].split(" ").map((el: string) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(" ").trim();
    }

    private number = (field: string): number | null => {
        return this.isValid(field) ? this.user[field] : null;
    }

    private phone = (field: string): string | null => {
        const countryCode = phoneCodes[this.user.country];

        return this.isValid(field) ? `${countryCode ? countryCode : ""}${this.user[field]}` : null;
    }

    private email = (field: string): string | null => {
        return this.isValid(field) ? this.user[field] : null;
    }
}
