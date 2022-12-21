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

export class UserValidator {
    constructor(public user: User) {
    }

    public static validationRules = {
        full_name: (user: User) => typeof user.full_name === "string" && user.full_name.split(" ").length === 2,
        gender: (user: User) => user.gender.toLowerCase() === "male" || user.gender.toLowerCase() === "female",
        note: (user: User) => typeof user.note === "string",
        state: (user: User) => typeof user.state === "string",
        city: (user: User) => typeof user.city === "string",
        country: (user: User) => countries().includes(user.country),
        age: (user: User) => Number.isInteger(user.age) && user.age >= 18 && user.age <= 100,
        phone: (user: User) => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/.test(user.phone),
        email: (user: User) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email),
    }

    public validate(): UserValidator {
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
            if(this.user[field] == null) continue;
            this.user[field] = fieldsValidation[field]();
        }

        return this
    }

    public isValid(): boolean {
        for (const key in this.user) {
            if (!Object.keys(UserValidator.validationRules).includes(key))
                continue;

            if (!this.isValidBy(key))
                return false;
        }

        return true;
    }

    public isValidBy(field: string): boolean {
        return UserValidator.validationRules[field](this.user);
    }


    private capitalizeFirst = (field: string): string => {
        return this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    }

    private capitalize = (field: string): string => {
        return this.user[field].split(" ").map((el: string) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(" ").trim();
    }

    private number = (field: string): number => {
        return this.isValidBy(field) ? this.user[field] : null;
    }

    private phone = (field: string): string => {
        const countryCode = phoneCodes[this.user.country];

        return this.isValidBy(field) ? `${countryCode ? countryCode : ""}${this.user[field]}` : null;
    }

    private email = (field: string): string | null => {
        return this.isValidBy(field) ? this.user[field] : null;
    }
}

export function validatedUsers(users: User[]): User[]{
    const res = [] as User[];

    for(const user of users) {
        const validator = new UserValidator(user);

        if (validator.validate().isValid())
            res.push(user);
    }

    return res;
}
