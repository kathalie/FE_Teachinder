import { countries } from "../constants/countries.js";
import { phoneCodes } from "../constants/constants.js";
export class UserValidator {
    user;
    constructor(user) {
        this.user = user;
    }
    static validationRules = {
        full_name: (user) => typeof user.full_name === "string",
        gender: (user) => user.gender.toLowerCase() === "male" || user.gender.toLowerCase() === "female",
        note: (user) => typeof user.note === "string",
        state: (user) => typeof user.state === "string",
        city: (user) => typeof user.city === "string",
        country: (user) => countries().includes(user.country),
        age: (user) => Number.isInteger(user.age) && user.age >= 18 && user.age <= 100,
        //phone: (user: User) => /(\(?\+[0-9]{1,3}\)?)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?
        // ?(\w{1,10}\s?\d{1,6})?/.test(user.phone),
        email: (user) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email),
    };
    validate() {
        const fieldsValidation = {
            full_name: () => this.capitalize("full_name"),
            gender: () => this.capitalize("gender"),
            note: () => this.capitalizeFirst("note"),
            state: () => this.capitalize("state"),
            city: () => this.capitalize("city"),
            country: () => this.capitalize("country"),
            //age: () => this.number("age"),
            //phone: () => this.phone("phone"),
            email: () => this.email("email")
        };
        for (const field in fieldsValidation) {
            if (this.user[field] == null)
                continue;
            this.user[field] = fieldsValidation[field]();
        }
        return this;
    }
    isValid() {
        for (const key in this.user) {
            if (!Object.keys(UserValidator.validationRules).includes(key))
                continue;
            if (!this.isValidBy(key))
                return false;
        }
        return true;
    }
    isValidBy(field) {
        return UserValidator.validationRules[field](this.user);
    }
    capitalizeFirst = (field) => {
        //if (this.isValidBy(field)) return null;
        return this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    };
    capitalize = (field) => {
        //if (this.isValidBy(field)) return null;
        return this.user[field].split(" ").map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(" ").trim();
    };
    number = (field) => {
        return this.isValidBy(field) ? this.user[field] : null;
    };
    phone = (field) => {
        const countryCode = phoneCodes[this.user.country];
        return this.isValidBy(field) ? `${countryCode ? countryCode : ""}${this.user[field]}` : null;
    };
    email = (field) => {
        return this.isValidBy(field) ? this.user[field] : null;
    };
}
export function validatedUsers(users) {
    const res = [];
    for (const user of users) {
        const validator = new UserValidator(user);
        if (validator.validate().isValid())
            res.push(user);
    }
    return res;
}
//# sourceMappingURL=validator.js.map